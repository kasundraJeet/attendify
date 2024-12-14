hii chatgpt i have company-service this service folder structure is

confings
logs
src
 models
 routers
 controllers
utils
app.js

for my company i need authcation in this authcation i want

crete company in crete company(sign-up) i have Company name,Email,Team Size,Country,Password and login only email and password and google login and apple id and forget password only i need send email and this email send password

and my company table like this 

# Company Information Table

This table outlines the structure and fields for company data in your app.

| Field Name          | Description                                            | Example                         |
| ----------------------- | ---------------------------------------------------------- | ----------------------------------- |
| company_id          | Unique identifier for the company (auto-generated).        | 12345                               |
| company_name        | Full name of the company.                                  | XYZ Corp.                           |
| company_type        | Type of company (e.g., Tech, Retail, Manufacturing, etc.). | Software, E-commerce, Manufacturing |
| email               | Company email address (used for official communications).  | contact@xyz.com                     |
| website             | Official website URL.                                      | www.xyzcorp.com                     |
| country             | Country where the company is registered.                   | United States                       |
| Number of Employees | Number of employees in the company.                        | 200 employees                       |
| address             | Physical office address.                                   | 123 Main Street, NY 10001           |
| registration_no     | Company registration number or business license ID.        | ABC123456789                        |
| founded_year        | Year the company was founded.                              | 2010                                |
| social_media        | Links to social media profiles (LinkedIn, Facebook, etc.). | [LinkedIn](https://linkedin.com)    |
| status              | Current status of the company (Active, Inactive, etc.).    | Active                              |
| company_logo        | Logo image file (optional, can store as a URL or path).    | logo_xyz.png                        |
| created_at          | Timestamp of when the entry was created.                   | 2024-12-06 15:00:00                 |
| updated_at          | Timestamp of the last update made to the entry.            | 2024-12-06 15:30:00                 |


use mongodb and express.js