package main

import "go.mongodb.org/mongo-driver/bson/primitive"

func objectIDFromString(str string) primitive.ObjectID {
	var objId [12]byte
	paramId := []byte(str)
	copy(objId[:], paramId)
	return objId
}
