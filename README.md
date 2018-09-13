## OneMAX

### Project Goal
At OneMAX, our goal is to create a fully immersive website for individuals to nominate other individuals in their respective communities for ourstanding work they are doing. This website has a goal of promoting social good and involvement in our local communities. We have a dua (prayer) voting system so other users of the website can give duas to these outstanding individuals.

### Technicals
We are using React for our frontend and a combination of Go and Ruby for our backend, running on top of a PostgreSQL database. We are currently hosting the website using a Heroku application. It can be accessed at https://onemax.org/.

### Team
We are all volunteers at MAXGala, a organization based in Toronto.
The technical team members are Ahmed Hamodi (frontend), Arsalan Rana (frontend), and Saman Alvi (backend).
Shout out to this amazing group of people for bring this project to light.

### Release Information
The current release date is set for August 31st.

### Development

#### Authentication
To get the Facebook and Google Authentication working, we need to be hosted on a certified HTTPS website. Fortunately, the Heroku app we host on does cerification management for us. However, for development on local environments, we need to toggle the environment variable for `HTTPS` to `true`. Default is `false`. This tag can be found in the root folder, in the `.env` file.

#### Deployment
Once your environment is set up for authentication to work, you can begin making coding changes and start deployment. Follow the following steps:
1. Copy the repo: git clone git@github.com:ahmedhamodi/onemax.git
2. Add the development heroku host: git remote add dev https://git.heroku.com/intense-journey-59867.git
3. Make a branch: git checkout -b user_name\project_name
4. Make changes to branch
5. Create PR on github repo: https://github.com/ahmedhamodi/onemax
6. Once PR is approved, merge into GitHub master branch
7. Push to development branch and test to make sure no environment specific issues: git push dev master
8. Push to production branch: git push heroku master
