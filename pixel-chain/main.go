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

	"crypto/rand"
	"encoding/base64"
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

func ipfs_store_image(file *bufio.Reader, file_name string) {
	// imagePath := "./monk.jpg"

	// Create a new IPFS client
	node := shell.NewShell("127.0.0.1:5001")
	// Add text file

	// err := node.FilesMkdir(context.Background(), "/abc")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// if err := node.FilesWrite(context.Background(), "/abc/abc.txt", openAndRead(textFilePath)); err != nil {
	// 	panic(err)
	// }
	result, err := node.Add(file)
	if err != nil {
		panic(err)
	}
	node.FilesCp(context.Background(), "/ipfs/"+result, "/abc/"+file_name)

	// if err := node.FilesMv(context.Background(), "/ipfs/"+result, "/abc/example.txt"); err != nil {
	// 	fmt.Println("Error moving file to folder:", err)
	// 	return
	// }
	// Add image file
	// result, err := node.Add(openAndRead(imagePath))
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Printf("Added image file: %s\n", result)

	ls, err := node.FilesLs(context.Background(), "/abc")

	if err != nil {
		panic(err)
	}

	for _, v := range ls {
		stat, err := node.FilesStat(context.Background(), "/abc/"+v.Name)
		if err != nil {
			panic(err)
		}
		fmt.Println(v.Name, stat.Hash)
	}
}

func generateRandomString(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(bytes)[:length], nil
}

func ErrorResponse(c echo.Context, result_type int, message interface{}, data echo.Map) error {
	return c.JSON(http.StatusBadRequest, echo.Map{"message": message, "result": result_type, "data": data})
}

func SuccessResponse(c echo.Context, result_type int, message interface{}, data echo.Map) error {
	return c.JSON(http.StatusOK, echo.Map{"message": message, "result": result_type, "data": data})
}

func create_ipfs_folder(c echo.Context) (string, string, string, error) {
	folder_name, err := generateRandomString(16)
	if err != nil {
		return "", "", "", ErrorResponse(c, 0, "Unable to create Random String!", nil)
	}

	sign_key, err := generateRandomString(16)
	if err != nil {
		return "", "", "", ErrorResponse(c, 0, "Unable to create Random String!", nil)
	}

	node := shell.NewShell("127.0.0.1:5001")

	sep, err := generateRandomString(2)

	if err != nil {
		return "", "", "", ErrorResponse(c, 0, "Unable to create Random String!", nil)
	}

	err = node.FilesMkdir(context.Background(), "/"+folder_name+sep+sign_key)
	if err != nil {
		return "", "", "", ErrorResponse(c, 0, "Check IPFS INSTANCE!", nil)
	}

	return folder_name, sep, sign_key, nil

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

	e.GET("/gen_sign", func(c echo.Context) error {
		folder, sep, sign_key, err := create_ipfs_folder(c)
		if err != nil {
			return err
		}
		return SuccessResponse(c, 1, "QR Created Successfully!", echo.Map{
			"folder_name": folder,
			"sep":         sep,
			"sign_key":    sign_key,
		})
	})
	e.POST("/", func(c echo.Context) error {
		folder_name := c.FormValue("folder_name")
		sep := c.FormValue("sep")
		sign_key := c.FormValue("sign_key")
		image, err := c.FormFile("image")
		if err != nil {
			fmt.Println(err.Error())
		}
		src, err := image.Open()
		if err != nil {
			return err
		}
		defer src.Close()
		ipfs_store_image(bufio.NewReader(src), image.Filename)
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
