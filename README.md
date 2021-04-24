# Image upload and thumbnail creator

The idea was to create an express api where clients can upload an image, the API should create thumbnails of the image and store them in the postgresql along with the actual image. The clients should also be able to retrieve all images, one image and related thumbnails.


# How to run locally?
- Clone the repository, change the config file and add your local or remote postgresql database connection string
- pnpm/npm install
- pnpm/npm run dev
- This will start the server at PORT 5000 - the port can also be configured from the config file

# Learnings
- Postgresql was a new learning along with the sequelize ORM since its been a long time when I worked with a SQL database, it has been mostly NoSQL recently
- I have never worked with storing images locally in a database - it mostly about storing them on Amazon S3 or azure blob so it was a good experience
- I had taken some typescript courses but never got an opportunity to work on an actual project - this was a really cool experience working with express and typescript  
