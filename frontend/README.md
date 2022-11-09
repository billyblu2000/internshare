---
title: NYUSH internshare v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# NYUSH internshare

> v1.0.0

Base URLs:

# Documents/Backend API Requirements/home page

## GET recommend job post

GET /api/homepage/recommendpost/jobs

> Response Examples

> Sucess

```json
"{\n    \"status\": \"ok\",\n    \"result\": [\n        {\n            \"id\": 2,\n            \"title\": \"SWE\",\n            \"date\": \"2022-12-04\",\n            \"description\": \"A new job\",\n            \"company\": \"ByteDance\",\n            \"student_email\": \"yl7002@nyu.edu\",\n            \"requirement\": \"CS major only\",\n            \"color\":,\n            \"name\":,\n        },\n        {\n            \"id\": 3,\n            \"title\": \"SWE\",\n            \"date\": \"2022-12-04\",\n            \"description\": \"A new job\",\n            \"company\": \"ByteDance\",\n            \"student_email\": \"yl7002@nyu.edu\",\n            \"requirement\": \"CS major only\"\n            \"color\":,\n            \"name\":,\n        }\n    ]\n}"
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST check apply status

POST /api/homepage/applystatus

> Body Parameters

```json
"{\n    \"email\"\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok",
  "result": [
    {
      "id": null,
      "status": "Pending",
      "title": "SWE",
      "company_name": "ByteDance",
      "start": "2020-12-07",
      "end": "2021-12-20"
    },
    {
      "id": null,
      "status": "Reject",
      "title": "SWE",
      "company_name": "ByteDance",
      "start": "2020-12-07",
      "end": "2021-12-20"
    },
    {
      "id": null,
      "status": "In Progress",
      "title": "SWE",
      "company_name": "ByteDance",
      "start": "2020-12-07",
      "end": "2021-12-20"
    }
  ]
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST hp_search_suggestion

POST /api/homepage/searchsuggestions

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|content|query|string| no |none|

> Response Examples

> Sucess

```json
[
  "Java Software Developer",
  "Java Software Engineer",
  "Virtual Reality Software Engineer",
  "Software Developer",
  "Lead Software Engineer",
  "Software Programmer",
  "Junior Software Engineer",
  "Microsoft Dynamics Consultant",
  "Senior Software Engineering",
  "Software QA"
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|

### Responses Data Schema

## GET get recommend general posts

GET /api/homepage/recommendpost/generals

> Response Examples

> Sucess

```json
"{\n    \"status\":\"ok\",\n    \"result\":[\n        {\n            \"id\":2,\n         \"studennt_email\": \"yl7002@nyu.edu\",\n            \"company\": \"ByteDance\",\n            \"content\": \"Good Company\",\n            \"title\": \"Promotion\",\n            \"date\": \"2022-03-14\",\n    },\n    {\n          \"id\":3,\n          \"studennt_email\": \"yl7002@nyu.edu\",\n            \"company\": \"ByteDance\",\n            \"content\": \"Good Company\",\n            \"title\": \"Promotion\",\n            \"date\": \"2022-03-14\",\n    }\n    ]\n    \n}\n// at most 5 general posts "
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/JOB post

## POST get comment of a post 

POST /api/job/getpostcomment

> Body Parameters

```json
"{\n    \"jobpostid\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|string| no |none|

> Response Examples

> Sucess

```json
{
  "comment": [
    {
      "color": "#bf3f84",
      "company_email": null,
      "content": "Change successfully",
      "datetime": "04/30/2022, 18:56:39",
      "descendent": [
        {
          "color": "#3fbabf",
          "company_email": null,
          "content": "how much is the estimate salary? Thank you!",
          "datetime": "05/05/2022, 11:44:46",
          "descendent": [],
          "id": 3,
          "job_post_id": 3,
          "like": 12,
          "name": "Billy",
          "root": 1,
          "student_email": "ly1387@nyu.edu"
        }
      ],
      "id": 1,
      "job_post_id": 3,
      "like": 0,
      "name": "Yumeng Lu",
      "root": 1,
      "student_email": "yl7002@nyu.edu"
    },
    {
      "color": "#528CAE",
      "company_email": "amazon@amazon.com",
      "content": "Make sense",
      "datetime": "05/07/2022, 21:46:09",
      "descendent": [
        {
          "color": "#9ebf3f",
          "company_email": null,
          "content": "Wow offical!!",
          "datetime": "05/07/2022, 21:46:47",
          "descendent": [],
          "id": 7,
          "job_post_id": 3,
          "like": 2,
          "name": "Yuejia Zhang",
          "root": 6,
          "student_email": "yz6203@nyu.edu"
        },
        {
          "color": "#bf3f84",
          "company_email": null,
          "content": "heyheyhey",
          "datetime": "05/08/2022, 04:10:31",
          "descendent": [],
          "id": 15,
          "job_post_id": 3,
          "like": null,
          "name": "Yumeng Lu",
          "root": 6,
          "student_email": "yl7002@nyu.edu"
        }
      ],
      "id": 6,
      "job_post_id": 3,
      "like": 40,
      "name": "Amazon",
      "root": 6,
      "student_email": null
    }
  ],
  "status": "ok"
}
```

> Failure

```json
"{\n              \"status\":\"post id DNE\",\n              \"comments\":[]\n            })\n"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST delete a comment 

POST /api/job/delete/comment

> Body Parameters

```json
"{\n    \"comment_id\":\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST update a comment

POST /api/job/update/comment

> Body Parameters

```json
"{\n    \"comment_id\":,\n    \"new_content\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST create a comment

POST /api/job/create/comment

> Body Parameters

```json
"{\n    \"content\":,\n    \"jobpost_id\": the job post's id,\n    \"target_id\": the comment id the comment is commenting to,\n    \"root\": the root comment: first layer or Null if it is directly apply to the job post\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST like a comment

POST /api/job/like/comment

> Body Parameters

```json
"{\n    \"comment_id\":\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST apply

POST /api/job/apply

> Body Parameters

```json
"{\n    \"jobpost_id\":,\n    \"method\":cv/profile,\n    \"publisher\": the publisher's email of the job post,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST get job info

POST /api/job/detailedinfo

> Body Parameters

```json
"{\n    \"jobpost_id\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
"{\n    \"status\":\"ok\",\n    \"result\":{\n            \"id\": ,\n            \"is_company\": ,\n            \"student_email\": ,\n            \"Datetime\": \"%m/%d/%Y, %H:%M:%S\",\n            \"des\": ,\n            \"requirement\": ,\n            \"start_date\": \"%m/%d/%Y, %H:%M:%S\",\n            \"end_date\": \"%m/%d/%Y, %H:%M:%S\",\n            \"company_name\": ,\n            \"title\": ,\n            \"apply_start\": \"%m/%d/%Y, %H:%M:%S\",\n            \"end_date\": \"%m/%d/%Y, %H:%M:%S\",\n            \"salary\": ,\n            \"student_name\":,\n            \"color\":,\n        }\n}"
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/Applications

## POST cancel application 

POST /api/apply/cancel

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|application_id|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/profile

## POST get profile

POST /api/profile/get

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|email|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok",
  "result": {
    "id\"": null,
    "email": null,
    "name": null,
    "cv_id": null,
    "project": null,
    "internship": null,
    "education": null,
    "awards": null,
    "activity": null,
    "skills": null,
    "public": null
  }
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST update a profile

POST /api/profile/update

> Body Parameters

```json
"{\n    \"project_experience\":,\n    \"internship_experience\":,\n    \"education_background\":,\n    \"awards\":,\n    \"activities\":,\n    \"skills\":,\n    \"public\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET get user name

GET /api/profile/getname

> Response Examples

> Sucess

```json
{
  "status": "ok",
  "name": "name"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET download cv

GET /api/profile/download

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|cv_id|query|string| no |none|

> Response Examples

> Sucess

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET change profile visibility

GET /api/profile/changesvisibility

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|status|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST create a profile

POST /api/profile/create

> Body Parameters

```json
"{\n    \"project_experience\":,\n    \"internship_experience\":,\n    \"education_background\":,\n    \"awards\":,\n    \"activities\":,\n    \"skills\":,\n    \"public\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/login/register

## POST login page

POST /api/login

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|email |query|string| no |none|
|password|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "success"
}
```

```json
"{\"status\":\"password does not match\"}\n{\"status\": \"DNE\"}"
```

> 400 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST student register form 

POST /api/login/register/student

student register form 

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|email|query|string| no |none|
|password|query|string| no |none|
|confirPW|query|string| no |none|
|major|query|string| no |none|
|year|query|string| no |none|
|name|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "success"
}
```

> Failure

```json
{
  "status": "password does not match"
}
```

```json
{
  "status": "user already exists"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST student register email sending

POST /api/login/student/sendemail

send verification code

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|email |query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "success"
}
```

> Failure

```json
{
  "status": "no email"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET verify OTP

GET /api/login/student/verify

verify OTP matches

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|email |query|string| no |none|
|code|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "success"
}
```

> Failure

```json
{
  "status": "code does not match"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/mypost

## POST delete a job post 

POST /api/mypost/delete

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|job_id|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET view all my jobpost applicants 

GET /api/mypost/viewall

> Response Examples

> Sucess

```json
{
  "applicants": [
    {
      "create_time": "05/05/2022, 11:40:15",
      "id": 6,
      "is_online": null,
      "major": "Computer Science",
      "name": "Melissa Xu",
      "post_id": 3,
      "status": "Pending",
      "student_email": "mx648@nyu.edu",
      "year": "2023"
    }
  ],
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## GET get all my post

GET /api/mypost/get

> Response Examples

> Sucess

```json
"{\n    \"status\":\"ok\",\n    \"result\":[\n            {\n                \"id\": 1,\n                \"is_company\": 0,\n                \"company_email\":,\n                \"student_email\": \"yl7702@nyu.edu\",\n                \"Datetime\": \"%m/%d/%Y, %H:%M:%S\",\n                \"des\": \"Requires cs student\",\n                \"requirement\": \"Require CS student\",\n                \"start_date\": \"%m/%d/%Y, %H:%M:%S\",\n                \"end_date\": \"%m/%d/%Y, %H:%M:%S\",\n                \"company_name\": \"byteDance\",\n                \"title\": \"Back-end\",\n                \"apply_start\": \"%m/%d/%Y, %H:%M:%S\",\n                \"end_date\": \"%m/%d/%Y, %H:%M:%S\",\n                \"salary\": 3000,\n                \"student_color\":,\n                \"company_color\":,\n            },{\n\n            },{\n\n            }]\n}\n"
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST create a post

POST /api/mypost/create

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|company_name|query|string| no |none|
|is_Company|query|string| no |none|
|company_email|query|string| no |none|
|job_description|query|string| no |none|
|job_requirements|query|string| no |none|
|job_start_date|query|string| no |none|
|estimate_salary|query|string| no |none|
|post_title|query|string| no |none|
|job_end_date|query|string| no |none|
|apply_start_date|query|string| no |none|
|apply_end_date|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST accept an applicant

POST /api/mypost/accept/application

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|application_id|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST reject an applicant 

POST /api/mypost//reject/application

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|application_id|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/searchPage

## POST search particular general post

POST /api/homepage/searchone/general

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|filter|query|string| no |none|
|pagenumber|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok",
  "result": [
    {
      "general_post_id": 2,
      "studennt_email": "yl7002@nyu.edu",
      "company": "",
      "content": "Hhawohei",
      "title": "How to get an internship",
      "date": "2022-04-19"
    }
  ]
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

## POST search to get job post by using the search box function 

POST /api/search/jobpost

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|filter|query|string| no |the thing entered in the search box|
|pagenumber|query|string| no |none|

> Response Examples

> Sucess

```json
{
  "result": [
    {
      "Datetime": "2022-05-05",
      "apply_end": "2022-06-30",
      "apply_start": "",
      "color": "#E8E02F",
      "company_email": "shopee@shopee.com",
      "company_name": "shopee",
      "des": "finance manager",
      "end_date": "",
      "id": 7,
      "is_company": true,
      "name": "Shopee",
      "requirement": "finance major, business major, econ major",
      "salary": null,
      "start_date": "2022-07-02",
      "student_email": null,
      "title": "Shopee finance manager"
    },
    {
      "Datetime": "2022-05-05",
      "apply_end": "2022-05-20",
      "apply_start": "",
      "color": "#52AE83",
      "company_email": "lazada@lazada.com",
      "company_name": "lazada",
      "des": "sale intern",
      "end_date": "",
      "id": 6,
      "is_company": true,
      "name": "Lazada",
      "requirement": "finance major, business major",
      "salary": 20000,
      "start_date": "2022-07-01",
      "student_email": null,
      "title": "Lazada sale intern"
    },
    {
      "Datetime": "2022-05-05",
      "apply_end": "2022-05-29",
      "apply_start": "",
      "color": "#972FE8",
      "company_email": "bosch@bosch.com",
      "company_name": "bosch",
      "des": "tax intern",
      "end_date": "",
      "id": 5,
      "is_company": true,
      "name": "Bosch",
      "requirement": "finance major",
      "salary": 30000,
      "start_date": "2022-06-01",
      "student_email": null,
      "title": "Bosch tax intern"
    },
    {
      "Datetime": "2022-05-04",
      "apply_end": "2022-06-29",
      "apply_start": "",
      "color": "#AE6252",
      "company_email": "tiktok@gmail.com",
      "company_name": "tiktok",
      "des": "database engineer",
      "end_date": "",
      "id": 4,
      "is_company": true,
      "name": "TikTok",
      "requirement": "database major",
      "salary": 50000,
      "start_date": "2022-05-01",
      "student_email": null,
      "title": "Tiktok database engineer"
    },
    {
      "Datetime": "2022-04-30",
      "apply_end": "2022-07-01",
      "apply_start": "",
      "color": "#bf3f84",
      "company_email": null,
      "company_name": "google",
      "des": "data science",
      "end_date": "2022-06-01",
      "id": 3,
      "is_company": false,
      "name": "Yumeng Lu",
      "requirement": "data science",
      "salary": null,
      "start_date": "2022-05-01",
      "student_email": "yl7002@nyu.edu",
      "title": "google data science"
    }
  ],
  "status": "ok"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Documents/Backend API Requirements/setting

## POST change password

POST /api/setting/password

> Body Parameters

```json
"{\n    \"password\":,\n}"
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> Sucess

```json
{
  "status": "ok"
}
```

```json
{
  "status": "Original password incorrect"
}
```

```json
{
  "status": "Comfirm password incorrect"
}
```

> Failure

```json
{
  "status": "fail"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sucess|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Failure|Inline|

### Responses Data Schema

# Data Schema

