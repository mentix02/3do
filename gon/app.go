package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var taskColl *mgm.Collection

func init() {
	err := mgm.SetDefaultConfig(nil, "3do", options.Client().ApplyURI("mongodb://localhost:27017"))
	taskColl = mgm.Coll(&Task{})
	if err != nil {
		log.Fatalln(err)
	}
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	api := router.Group("/api")
	{
		api.GET("/tasks", getTasks)
		api.POST("/tasks", createTask)
		api.GET("/tasks/:id", getTask)
		api.PATCH("/tasks/:id", updateTask)
		api.DELETE("/tasks/:id", deleteTask)
	}

	log.Fatalln(router.Run())
}
