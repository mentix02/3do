package main

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	ID primitive.ObjectID `json:"_id" bson:"_id,omitempty"`

	Content   string             `json:"content" bson:"content"`
	Priority  int                `json:"priority" bson:"priority"`
	Completed bool               `json:"completed" bson:"completed"`
	Timestamp primitive.DateTime `json:"timestamp" bson:"timestamp"`
}

func (task *Task) PrepareID(id interface{}) (interface{}, error) {
	if idStr, ok := id.(string); ok {
		return primitive.ObjectIDFromHex(idStr)
	}

	// Otherwise, id must be ObjectId
	return id, nil
}

func (task *Task) GetID() interface{} {
	return task.ID
}

func (task *Task) SetID(id interface{}) {
	task.ID = id.(primitive.ObjectID)
}

func (task *Task) CollectionName() string {
	return "tasks"
}

func (task *Task) Creating(_ context.Context) error {
	task.Timestamp = primitive.DateTime(time.Now().Unix())
	return nil
}
