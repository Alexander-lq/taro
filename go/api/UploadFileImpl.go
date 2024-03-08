package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/wallace5303/ee-go/ehelper"
	"github.com/wallace5303/ee-go/elog"
	"gopkg.in/yaml.v3"
	"io"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func UploadFileImpl(f *gin.Context) {

	defer func() {
		err := recover() //	recover 内置函数捕获异常
		if err != nil {  // 	nil 是 err 的零值
			ret := ehelper.GetJson()
			defer f.JSON(http.StatusOK, ret)
			ret.Data = err
			ret.Msg = "出错"
			ret.Code = http.StatusInternalServerError
			elog.Logger.Error("ERR:", err)
			//runtime error: index out of range [3] with length 3
		}
	}()

	// Multipart form
	form, _ := f.MultipartForm()
	//keyType := form.Value["keyType"]
	regx := form.Value["regx"][0]
	path := form.Value["path"][0]
	mode := form.Value["mode"][0]
	modeType, err := strconv.Atoi(mode)
	if err != nil {
		fmt.Println("转换失败:", err)
		return
	}
	content := form.Value["content"][0]
	exportPath := form.Value["exportPath"][0]
	//
	//fileNames := make(map[string]int)

	files := form.File["upload"]

	for _, file := range files {
		yamlFile, err := file.Open()
		//yamlFile, err := os.ReadFile(file.Filename)
		if err != nil {
			f.String(http.StatusBadRequest, fmt.Sprintf("读取文件失败: %s", err.Error()))
			return
		}
		defer yamlFile.Close()

		yamlFiles, err := io.ReadAll(yamlFile)

		decoder := yaml.NewDecoder(strings.NewReader(string(yamlFiles)))

		var yamlList []map[string]interface{}
		for {
			var yamlData map[string]interface{}
			errs := decoder.Decode(&yamlData)
			if errs != nil {
				break
			}
			yamlList = append(yamlList, yamlData)
			// 处理当前YAML文档的数据
			fmt.Println(yamlData)
		}

		if err != nil {
			f.String(http.StatusInternalServerError, fmt.Sprintf("读取文件内容失败: %s", err.Error()))
			return
		}

		//var yamlData map[string]interface{}
		//if err := yaml.Unmarshal(data, &yamlData); err != nil {
		//	f.String(http.StatusBadRequest, fmt.Sprintf("解析YAML文件失败: %s", err.Error()))
		//	return
		//}

		// 拆分路径
		keys := strings.Split(path, ".")

		var value []interface{}
		// 逐级访问嵌套的键值对
		for _, yamlData := range yamlList {
			var values interface{}
			values = yamlData
			for _, key := range keys {
				if v, ok := values.(map[string]interface{}); ok {
					values = v[key]
				} else {
					// 如果路径无效或类型不匹配，可以在此处处理异常情况
					fmt.Println("路径无效或类型不匹配")
					break
				}
			}
			value = append(value, values)
		}
		var stringValue string
		for i, val := range value {
			stringValues, ok := val.(string)
			if !ok {
				fmt.Printf("key不是字符串类型值 %d: %v\n", i+1, val)
				continue
			}
			stringValue = stringValues
			fmt.Printf("值 %d: %v\n", i+1, val)
		}

		// 从YAML文件中取出指定的值，这里假设键为"key"
		fmt.Sprintf("从YAML文件中取出的值为: %v", value)

		//拿出对应的值进行加密回写
		YarmDatas = string(yamlFiles)
		// 正则表达式匹配字段和内容
		re := regexp.MustCompile(regx)
		for _, yamlData := range yamlList {
			decryptAndUpdate(yamlData, re, modeType, stringValue, content)
		}

		//yra := YarmDatas
		//fmt.Sprintf(yra)
		// 找到第一个 spring 字段的位置
		// 写入到文件
		dst := exportPath + file.Filename
		err = os.WriteFile(dst, []byte(YarmDatas), 0644)
		if err != nil {
			fmt.Println("写入 YAML 文件失败:", err)
			return
		}
		ret := ehelper.GetJson()
		defer f.JSON(http.StatusOK, ret)
		ret.Msg = "成功解析上传的YAML文件"
		return
		//log.Println(file.Filename)
		//
		//// 上传文件至指定目录
		//f.SaveUploadedFile(file, dst)
	}
	ret := ehelper.GetJson()
	defer f.JSON(http.StatusOK, ret)
	ret.Msg = "文件为空"
	ret.Code = http.StatusInternalServerError
}

var M = map[string]string{}
var YarmDatas string

func decryptAndUpdate(data map[string]interface{}, re *regexp.Regexp, mode int, stringValue string, contents string) {

	for key, value := range data {
		strValue, ok := value.(string)
		if ok && re.MatchString(strValue) {
			match := re.FindStringSubmatch(strValue)
			if len(match) > 1 {
				content := match[1]
				// 转义正则表达式中的特殊字符
				escapedRegex := regexp.QuoteMeta(match[0])
				rp := regexp.MustCompile(escapedRegex)
				matchess := rp.FindStringSubmatchIndex(YarmDatas)
				encode, err := SM2Encode(stringValue, content, mode)
				if err != nil {
					fmt.Println("加密器失败:", err)
					return
				}

				// 将解密后的内容写回原字段
				// 构建动态的写回字段格式
				newFieldValue := fmt.Sprintf(contents, encode)

				// 替换部分
				atoi := matchess[0]
				atoi2 := matchess[1]
				//replacement := strings.Replace(matches[0], "HWAF(", values, 1)
				YarmDatas = YarmDatas[:atoi] + newFieldValue + YarmDatas[atoi2:]

				data[key] = newFieldValue // 写回原字段
			}
		} else if nestedData, ok := value.(map[string]interface{}); ok {
			decryptAndUpdate(nestedData, re, mode, stringValue, contents) // 递归处理嵌套结构
		}
	}
}
