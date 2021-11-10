package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// getTasks returns all tasks
func getTasks(ctx *gin.Context) {
	tasks := make([]Task, 0, 0)
	err := taskColl.SimpleFind(&tasks, bson.M{})
	if err != nil {
		log.Fatalln(err)
	}
	ctx.JSON(http.StatusOK, tasks)
}

// createTask creates a new task
func createTask(ctx *gin.Context) {
	var task Task
	err := ctx.BindJSON(&task)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	err = taskColl.Create(&task)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	ctx.JSON(http.StatusCreated, task)
}

// deleteTask deletes task with given id
func deleteTask(ctx *gin.Context) {
	task := &Task{}
	err := taskColl.FindByID(ctx.Param("id"), task)
	if err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	} else {
		_ = taskColl.Delete(task)
		ctx.JSON(http.StatusNoContent, gin.H{})
	}
}

// getTask returns task with given id
func getTask(ctx *gin.Context) {
	task := &Task{}
	err := taskColl.FindByID(ctx.Param("id"), task)
	if err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	} else {
		ctx.JSON(http.StatusOK, task)
	}
}

// updateTask updates task with given id
func updateTask(ctx *gin.Context) {
	task := &Task{}
	err := taskColl.FindByID(ctx.Param("id"), task)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	} else {
		err = ctx.BindJSON(task)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			_ = taskColl.Update(task)
			ctx.JSON(http.StatusOK, task)
		}
	}
}
