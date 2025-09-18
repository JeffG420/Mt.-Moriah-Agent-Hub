# Mount Moriah Agent Hub - Permission Matrix

This document outlines the Role-Based Access Control (RBAC) permissions for each user role within the Agent Hub.

## Roles

-   **Agent**: The baseline user. Can manage their own sales, clients, and progression.
-   **Manager**: A team leader. Can do everything an Agent can, plus manage and view their team's activities.
-   **Admin**: A back-office user. Can manage platform-wide operational data like approvals and validations.
-   **Superadmin**: A system owner. Has full unrestricted access, including system settings.

## Permission Matrix Table

| Feature / Action                        | Agent | Manager | Admin | Superadmin | Notes                                                              |
| :-------------------------------------- | :---: | :-----: | :---: | :--------: | :----------------------------------------------------------------- |
| **Site Tripping**                       |       |         |       |            |                                                                    |
| Create Request                          |   ✅   |    ✅    |   ❌   |     ❌     | Agents and Managers can request trippings for their clients.       |
| View Own Requests                       |   ✅   |    ✅    |  N/A  |    N/A     |                                                                    |
| View Team Requests                      |   ❌   |    ✅    |  N/A  |    N/A     | Managers can see requests from agents on their team.               |
| View All Requests (Admin Dashboard)     |   ❌   |    ✅    |   ✅   |     ✅     |                                                                    |
| **Approve Request (Admin Level)**       |   ❌   |    ❌    |   ✅   |     ✅     | Admin performs the initial validation and logistics check.         |
| **Finalize/Schedule (Superadmin Level)**|   ❌   |    ❌    |   ❌   |     ✅     | Superadmin gives the final approval and assigns resources.         |
| **Payments / Sales**                    |       |         |       |            |                                                                    |
| Create Payment Record                   |   ✅   |    ✅    |   ❌   |     ❌     | Agents and Managers can log payments for validation.               |
| View Own Payments                       |   ✅   |    ✅    |  N/A  |    N/A     |                                                                    |
| View Team Payments                      |   ❌   |    ✅    |  N/A  |    N/A     |                                                                    |
| View All Payments (Admin Dashboard)     |   ❌   |    ✅    |   ✅   |     ✅     |                                                                    |
| **Validate Payment**                    |   ❌   |    ❌    |   ✅   |     ✅     | Admin/Superadmin confirms receipt of funds. Triggers commission.   |
| **Promotions**                          |       |         |       |            |                                                                    |
| Create/Submit Application               |   ✅   |    ✅    |   ❌   |     ❌     | Agents/Managers can apply if they meet auto-checked criteria.      |
| View Own Application                    |   ✅   |    ✅    |  N/A  |    N/A     |                                                                    |
| View Team Applications                  |   ❌   |    ✅    |  N/A  |    N/A     |                                                                    |
| **Endorse Team Application**            |   ❌   |    ✅    |   ❌   |     ❌     | Manager provides the first level of approval for their agents.     |
| **Approve Application (Superadmin)**    |   ❌   |    ❌    |   ❌   |     ✅     | Superadmin gives the final sign-off which changes the user's role. |
| **Dashboards & Pages**                  |       |         |       |            |                                                                    |
| Access Agent Dashboard                  |   ✅   |    ✅    |   ✅   |     ✅     | The default view for Agents.                                       |
| Access Admin Dashboard                  |   ❌   |    ✅    |   ✅   |     ✅     | The default view for Managers, Admins, and Superadmins.            |
| Access **Settings** Page                |   ❌   |    ❌    |   ❌   |     ✅     | Only Superadmin can change system-wide configurations.             |
| **Team Management**                     |       |         |       |            |                                                                    |
| View Team Directory Page                |   ❌   |    ✅    |   ✅   |     ✅     | Managers, Admins and Superadmins can view all users.               |
|                                         |       |         |       |            |                                                                    |
