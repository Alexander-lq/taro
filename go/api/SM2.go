package api

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"github.com/tjfoc/gmsm/sm2"
	"github.com/tjfoc/gmsm/x509"
)

// SM2DecodeBase64 sm2私钥解密，密文base64编码
func SM2DecodeBase64(privKey string, data string, modeType int) (string, error) {
	priv, err := x509.ReadPrivateKeyFromHex(privKey)
	if err != nil {
		return "", err
	}
	ciphertext, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return "", err
	}
	plaintext, err := sm2.Decrypt(priv, []byte(ciphertext), 0)
	if err != nil {
		return "", err
	}
	return string(plaintext), nil
}

// SM2Encode sm2公钥加密
func SM2Encode(pubKey string, plaintext string, modeType int) (string, error) {
	pubMen, err := x509.ReadPublicKeyFromHex(pubKey)
	if err != nil {
		return "", err
	}
	msg := []byte(plaintext)
	ciphertxt, err := sm2.Encrypt(pubMen, msg, rand.Reader, modeType)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(ciphertxt), nil
}

// SM2Decode sm2私钥解密
func SM2Decode(privKey string, data string) (string, error) {
	priv, err := x509.ReadPrivateKeyFromHex(privKey)
	if err != nil {
		return "", err
	}
	ciphertext, err := hex.DecodeString(data)
	if err != nil {
		return "", err
	}
	plaintext, err := sm2.Decrypt(priv, []byte(ciphertext), 0)
	if err != nil {
		return "", err
	}
	return string(plaintext), nil
}
