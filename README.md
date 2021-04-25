
# Image upload and thumbnail creator

The idea was to create an express api where clients can upload an image, the API should create thumbnails of the image and store them in the postgresql database along with the actual image. The clients should also be able to retrieve all images, one image and related thumbnails.


# How to run locally?
- Clone the repository, change the config/environment file and add your local or remote postgresql database connection string 
- pnpm/npm install
- pnpm/npm run dev
- This will start the server at PORT 5000 - the port can also be configured from the config file

# How to test locally?
- Clone the repository and follow the above "how to run locally" guidelines
- pnpm run test
- Note that there is an image named "test.jpg" stored in the directory, it is used in the one of the tests

# Documentation
- API endpoints
	- /images
		- GET
			- return a list of all the base64 encoded images
		- POST
			- Create a new image - you can test it through postman with form data - the key of the file should be 'image'
		 - PUT & DELETE
			 - Method not allowed
	- /images/:imageId
		- GET
			- Return an object with three keys, image, thumbnail200, thumbnail300 - all base64 encoded strings
		- POST & PUT & DELETE
			- Method not allowed

# Learnings
- Its been some years since I last worked with a SQL based database - setting up Postgresql and working with sequelize ORM was definitely a great learning for me. I got to learn about the similarities between mongoose and sequelize and also some differences like schema, database migrations, etc
- I was always curious about typescript and wanted to explore it but could never afford some time - the project helped me learn and use typescript with express and SQL
