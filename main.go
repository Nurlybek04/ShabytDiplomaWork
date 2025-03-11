package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func sendEmailHandler(c *gin.Context) {
	var request struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат запроса"})
		return
	}

	err := sendEmail(request.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при отправке письма"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Письмо отправлено на " + request.Email})
}
func sendEmail(to string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	senderEmail := "danialturysbek004@gmail.com"
	senderPass := "qsjx dbwv cjho tflu"

	m := gomail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", to)
	m.SetHeader("Subject", "Проверка отправки")
	m.SetBody("text/plain", "email тексерілуде бір бір бір")

	d := gomail.NewDialer(smtpHost, smtpPort, senderEmail, senderPass)

	return d.DialAndSend(m)
}

type User struct {
	ID       uint   `gorm:"primaryKey;autoIncrement"`
	FullName string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Mobile   string `gorm:"not null"`
	Password string `gorm:"not null"`
	Role     string `gorm:"not null"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type Lesson struct {
	ID         uint   `gorm:"primaryKey"`
	Title      string `gorm:"not null"`
	YoutubeURL string `gorm:"not null"`
}

var db *gorm.DB
var jwtKey = []byte("your_secret_key")

func initDB() {
	dsn := "host=localhost user=postgres password=yourpassword dbname=yourdb port=5432 sslmode=disable"
	var err error

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Lesson{})
}

// func register(c *gin.Context) {
// 	var user User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	db.Create(&user)
// 	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
// }

func register(c *gin.Context) {
	var input struct {
		FullName string `json:"full_name"`
		Email    string `json:"email"`
		Mobile   string `json:"mobile"`
		Password string `json:"password"`
		Role     string `json:"role"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат запроса"})
		return
	}

	var existingUser User
	if err := db.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email уже зарегистрирован"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при хешировании пароля"})
		return
	}

	user := User{
		FullName: input.FullName,
		Email:    input.Email,
		Mobile:   input.Mobile,
		Password: string(hashedPassword),
		Role:     input.Role,
	}

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при сохранении пользователя"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Регистрация успешна!"})
}

func login(c *gin.Context) {
	var input User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user User

	if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if user.ID == 0 || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func createLesson(c *gin.Context) {
	var input Lesson
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("Get data: ", input)
	lesson := Lesson{Title: input.Title, YoutubeURL: input.YoutubeURL}
	db.Create(&lesson)

	c.JSON(http.StatusOK, gin.H{"message": "Lesson created successfully", "lesson": lesson})
}

func getLessons(c *gin.Context) {
	var lessons []Lesson
	db.Find(&lessons)

	c.JSON(http.StatusOK, lessons)
}
func getLesson(c *gin.Context) {
	var lesson Lesson
	if err := db.First(&lesson, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		return
	}

	embedURL := lesson.YoutubeURL
	if len(embedURL) > 32 {
		embedURL = embedURL[:24] + "embed/" + embedURL[32:]
	}

	c.JSON(http.StatusOK, gin.H{
		"title":             lesson.Title,
		"youtube_embed_url": embedURL,
	})
}
func updateLesson(c *gin.Context) {
	var lesson Lesson
	if err := db.First(&lesson, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		return
	}

	var input Lesson
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	db.Model(&lesson).Updates(input)

	c.JSON(http.StatusOK, gin.H{"message": "Lesson updated successfully", "lesson": lesson})
}
func deleteLesson(c *gin.Context) {
	var lesson Lesson
	if err := db.First(&lesson, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		return
	}

	db.Delete(&lesson)

	c.JSON(http.StatusOK, gin.H{"message": "Lesson deleted successfully"})
}
func main() {
	initDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	r.GET("/lessons", getLessons)
	r.GET("/lessons/:id", getLesson)
	r.POST("/lessons", createLesson)
	r.PUT("/lessons/:id", updateLesson)
	r.DELETE("/lessons/:id", deleteLesson)

	r.POST("/register", register)
	r.POST("/login", login)
	r.POST("/send-email", sendEmailHandler)

	r.Run(":8080")
}
