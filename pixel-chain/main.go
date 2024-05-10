package main

import (
	"bufio"
	"fmt"
	"io"
	"os"

	shell "github.com/ipfs/go-ipfs-api"
	"golang.org/x/net/context"

	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func openAndRead(filePath string) io.Reader {
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println(err.Error())
	}

	return bufio.NewReader(file)
}

func ipfs(c echo.Context) {
	node := shell.NewShell("127.0.0.1:5001")

	ls, err := node.FilesLs(context.Background(), "/abc")

	if err != nil {
		panic(err)
	}

	for _, v := range ls {
		stat, err := node.FilesStat(context.Background(), "/abc/"+v.Name)
		if err != nil {
			panic(err)
		}
		fmt.Println(stat.Hash)
	}
}

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	e.GET("/", func(c echo.Context) error {
		ipfs(c)
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
