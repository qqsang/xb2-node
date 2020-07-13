# 小白兔开发者之路--自由行

## 制作密钥与公钥

```
mkdir config
cd config
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
exit
```
