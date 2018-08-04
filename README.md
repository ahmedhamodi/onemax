## OneMAX

### Project Goal
At OneMAX, our goal is to create a fully immersive website for individuals to nominate other individuals in their respective communities for ourstanding work they are doing. This website has a goal of promoting social good and involvement in our local communities. We have a "dua" voting system so other users of the website can give duas to these outstanding individuals.

### Technicals
We are using React for our front end, and PostgreSQL for our backend. We are currently hosting the website using a Heroku App. It can be accessed at https://polar-falls-71863.herokuapp.com/ currently, but we hope to move to a custom domain name shortly.

### Team
We are all members of MAXGala, a team based in Toronto.
The team members are Aazar Zafar, Ahmed Hamodi, Arsalan Rana, Bilal Lodhi, Saad Siddiqui, and Saman Alvi.
Specific roles are:
Frontend: Ahmed Hamodi and Arsalan Rana
Backend: Saman Alvi
Design and Planning: Bilal Lodhi and Saad Siddiqui
Founder/Idea: Aazar Zafar
Shout out to this amazing group of people for bring this project to light.

### Release Information
The current release date is set for August 6th.

### Development
To get the Facebook Authentication working, we need to be hosted on a certified HTTPS website. Fortunately, the Heroku app we host on does cerification management for us. However, for development on local environments, we need to toggle the environment variable for `HTTPS` to `true`. Default is `false`. This tag can be found in the root folder, in the `.env` file.
