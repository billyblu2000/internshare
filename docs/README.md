# NYUSH Internship Information Sharing Platform

<img src="https://github.com/billyblu2000/internshare/blob/master/docs/imgs/Logo3.png" alt="logo" style="zoom:50%;" />

## Project Description
[InternSHare](https://github.com/billyblu2000/internshare) is a web system that serves the purpose of finding jobs or internships for NYUSH students and serves the companies, NYUSH students to find the candidates or successors for the jobs that they want to offer. Students can register or log in if they are already a member of the system. On the home page, customized job positions will be recommended to students. Students can also search for their desired jobs using hashtags, filters or direct search and then apply. Meanwhile, students can post a job post with job requirements, job title and job description included. They can view their posted job’s candidates and choose to accept or reject their applications. Students can also upload their CV or use the default template as their profile page. Furthermore, they can adjust the status of their profile page to determine if it can be viewed by others. Similarly, companies can register or log in if they are already a member of the system. They can post a job post and decide whether to accept a student’s job application. Both company user and NYUSH student user can start a general post, where users can discuss anything related to job hunting, internship experience, course evaluation e.t.c.
## Team Members and Role
- Back-end: [Yumeng Lu](https://github.com/Lu-Yumeng)
- Front-end: [Billy Yi](https://github.com/billyblu2000)
- Database and testing: [Daisy Huynh](https://github.com/DaisyHuynh)

## Envirnoment
The following services are required to install on your machine:
- MySQL 
- Python3
  - flask
  - pymysql
- [React](https://reactjs.org/)
- [AWS](https://aws.amazon.com/)

## Design
### System Design
![system](imgs/bigpic.png)
![structure](imgs/frontend%20structure.png)

### Database Design
![database](imgs/UML%20class%20.svg)

### API Design
![frontend](imgs/frontend.png)

| Path                             | Method |                           Params | Frontend Page | Flask Blueprint |
|----------------------------------|:------:|---------------------------------:|--------------:|----------------:|
| /api/login                       | `post` |                  email, password |             2 |   loginRegister |
| /api/login/student/sendemail     | `post` |                            email |             2 |   loginRegister |
| /api/login/student/verify        | `get`  |                      email, code |             2 |   loginRegister |
| /api/login/register/student      | `post` |        email, password, confirPW |             2 |   loginRegister |
| /api/homepage/searchsuggestions  | `post` |                          content |      1.1, 1.2 |        homepage |
| /api/search/jobpost              | `post` |               filter, pagenumber |           1.2 |          search |
| /api/homepage/recommendpost/jobs | `get`  |                                  |      1.1, 1.3 |        homepage |
| /api/homepage/applystatus        | `post` |                                  |    1.1, 1.3.3 |        homepage |
| /api/job/detailedinfo            | `post` |   jobpost\_id, method, publisher |           1.5 |         jobpost |
| /api/job/getpostcomment          | `post` |                        jobpostid |           1.5 |         jobpost |
| /api/job/create/comment          | `post` | content, jobpost\_id, target\_id |           1.5 |         jobpost |
| /api/job/update/comment          | `post` |        comment\_id, new\_content |           1.5 |         jobpost |
| /api/job/delete/comment          | `post` |                      comment\_id |           1.5 |         jobpost |
| /api/job/like/comment            | `post` |                      comment\_id |           1.5 |         jobpost |
| /api/job/apply                   | `post` |   jobpost\_id, method, publisher |           1.5 |         jobpost |
| /api/apply/cancel                | `post` |                  application\_id |         1.3.3 |           apply |
| /api/profile/get                 | `post` |                            email |         1.3.1 |         profile |
| /api/profile/update              | `post` |           project\_experience, … |         1.3.1 |         profile |
| /api/profile/download            | `post` |                           cv\_id |         1.3.1 |         profile |
| /api/profile/getname             | `get`  |                                  |             1 |         profile |
| /api/profile/changesvisibility   | `get`  |                           status |         1.3.4 |         profile |
| /api/mypost/get                  | `get`  |                                  |         1.3.2 |          mypost |
| /api/mypost/create               | `post` |     post\_title, company\_name,… |         1.3.2 |          mypost |
| /api/mypost/viewall              | `post` |                                  |         1.3.2 |          mypost |
| /api/mypost/delete               | `post` |                          job\_id |         1.3.2 |          mypost |
| /api/mypost/update               | `post` |   id, post\_title, company\_name |         1.3.2 |          mypost |
| /api/mypost/accept/application   | `post` |                  application\_id |         1.3.2 |          accept |
| /api/mypost/reject/application   | `post` |                  application\_id |         1.3.2 |          reject |

## Documentation
- [API documentation](../frontend/README.md): detailed API desciption
- [Project Documentation](project_documentation.pdf): The overall description of the project

## Project Overview
### Register Page
![register page](overview/register1.PNG)
![register page2](overview/register2.PNG)
![register page3](overview/register3.PNG)
![register page4](overview/register4.PNG)
#### User confirmation email
![confirmation](overview/confirmation.jpeg)

### Login Page
![login page](overview/login.PNG)

### Homepage
#### Feed
![homepage](overview/homepage.PNG)
#### Search
![search](overview/search_page.PNG)

#### Comment
![comment](overview/comment.PNG)
#### Job Posts
![jobpost](overview/job_post.PNG)
#### Apply Jobs
![apply](overview/apply_job.PNG)


### Search Page 
![search page](overview/search_page.PNG)

### User settings
![usersetting](overview/user_setting.PNG)
#### Profile
![profile](overview/profile.PNG)

#### Change Profile status 
![status](overview/status.PNG)

#### Posts
![posts](overview/posts.PNG)

#### Create Posts
![create_post](overview/create_post.PNG)

#### Applications
![applied](overview/applied.PNG)

## Iteration Goals
### Iteration I (Feb. 11 - Feb. 20)
- Determine project topic
- Preliminary analysis of needed functions

### Iteration II (Feb. 21 - Mar.13)
- Identify user cases 
- Plan iteration
- Set up environment
- Design data classes
- Assign tasks

### Iteration III (Mar. 13 - Mar. 27)
- Design basic page layout
- Front-end
  - Register Page
- Database
  - Set up databases

### Iteration IV (Mar. 27 - Apr. 14)
- Front-end
  - Login page
  - Homepage
- Back-end
  - CRUD post information
  - CRUD user information
  
### Iteration V (Apr. 15 - May. 2)
- Front-end
  - User setting page
- Back-end
  - CRUD application information
  - CURD homepage information
  
### Iteration VI (May 3 - May 10)
- Debugging and testing
- Finish documentation 
- Prepare for presentation


