# Mount Moriah Agent Hub - API & Schema Specification

This document outlines the data schemas for Firestore/SQL and the real-time event contracts for the Mount Moriah Agent Hub application.

## 1. Data Schemas (Firestore/SQL)

### 1.1 `users` Collection

Stores information for all users (Agents, Managers, Admins, Superadmins).

```json
{
  "userId": "string (Primary Key, e.g., AG-001)",
  "name": "string",
  "email": "string",
  "contact": "string",
  "location": "string",
  "role": "string ('Agent', 'Manager', 'Admin', 'Superadmin')",
  "teamId": "string (ForeignKey to 'teams' collection)",
  "joinDate": "timestamp",
  "avatarUrl": "string",
  "lastActive": "timestamp",
  "currentScreen": "string (e.g., '/dashboard')",
  "stats": {
    "lotsSold": "number",
    "recruits": "number",
    "sqmSold": "number",
    "commissionEarned": "number"
  },
  "complianceAckTimestamp": "timestamp | null"
}
```

### 1.2 `siteTrippingRequests` Collection

Stores requests for site trippings submitted by agents.

```json
{
  "requestId": "string (Primary Key)",
  "agentId": "string (ForeignKey to 'users')",
  "clientId": "string (ForeignKey to 'clients')",
  "project": "string",
  "preferredDate": "timestamp",
  "vehicleNeeded": "boolean",
  "passengerCount": "number",
  "purpose": "string",
  "status": "string ('Pending Admin Approval', 'Pending Superadmin Finalization', 'Scheduled', 'Completed', 'Rejected')",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "clientPhotoProofUrl": "string (URL to image)",
  "supportingDocsUrl": "string (URL to file) | null",
  "rejectionReason": "string | null"
}
```

### 1.3 `trippings` Collection

Stores confirmed and scheduled site tripping events.

```json
{
  "trippingId": "string (Primary Key)",
  "requestId": "string (ForeignKey to 'siteTrippingRequests')",
  "agentId": "string (ForeignKey to 'users')",
  "clientId": "string (ForeignKey to 'clients')",
  "scheduledDate": "timestamp",
  "driver": "string | null",
  "vehicle": "string | null",
  "proofPhotoBeforeUrl": "string (URL to image, taken at departure)",
  "proofPhotoAfterUrl": "string (URL to image, taken at site) | null",
  "result": "string ('Sale', 'Follow-up', 'Cancelled') | null",
  "notes": "string | null"
}
```
### 1.4 `payments` Collection

Stores all payment records submitted by agents, pending validation.

```json
{
    "paymentId": "string (Primary Key)",
    "agentId": "string (ForeignKey to 'users')",
    "clientId": "string (ForeignKey to 'clients')",
    "lotCode": "string",
    "amount": "number",
    "paymentDate": "timestamp",
    "isValidated": "boolean",
    "proofUrl": "string (URL to image/pdf)",
    "validatedBy": "string (ForeignKey to 'users', Admin/Superadmin) | null",
    "validatedAt": "timestamp | null",
    "createdAt": "timestamp"
}
```

### 1.5 `commissions` Collection

Stores commission records generated after a payment is validated.

```json
{
    "commissionId": "string (Primary Key)",
    "agentId": "string (ForeignKey to 'users')",
    "paymentId": "string (ForeignKey to 'payments')",
    "lotCode": "string",
    "commissionAmount": "number",
    "commissionPct": "number",
    "type": "string ('Direct', 'Override')",
    "sourceAgentId": "string (ForeignKey to 'users', for overrides) | null",
    "payoutDate": "timestamp | null",
    "createdAt": "timestamp"
}
```

### 1.6 `promotionApplications` Collection

Stores agent applications for promotion.

```json
{
    "applicationId": "string (Primary Key)",
    "agentId": "string (ForeignKey to 'users')",
    "fromRole": "string",
    "toRole": "string",
    "status": "string ('Pending Manager Endorsement', 'Pending Superadmin Approval', 'Approved', 'Rejected')",
    "submissionDate": "timestamp",
    "managerEndorsement": {
        "endorsedBy": "string (ForeignKey to 'users')",
        "timestamp": "timestamp",
        "notes": "string"
    },
    "finalApproval": {
        "approvedBy": "string (ForeignKey to 'users')",
        "timestamp": "timestamp",
        "notes": "string"
    },
    "supportingDocsUrl": "string (URL to file) | null"
}
```

### 1.7 `settings` Document

A single document (or table with one row) for global app settings.

```json
{
    "settingsId": "global",
    "commissionRates": {
        "Agent": 4,
        "Manager": 5,
        "Admin": 5.5
    },
    "transportSharePct": 0.3,
    "promotionCriteria": {
        "Manager": { "minLots": 5, "minRecruits": 10, "minTenureMonths": 5, "minCommissionEarned": 150000 },
        "Admin": { "minLots": 30, "minRecruits": 25, "minTenureMonths": 12, "minCommissionEarned": 800000 }
    }
}
```

---

## 2. Real-time Event Contracts (WebSocket / Firestore Listeners)

These events should be pushed from the server to connected clients to ensure the UI is always up-to-date.

### `presence:update`
- **Trigger:** User logs in, logs out, or changes activity status.
- **Payload:**
```json
{
  "event": "presence:update",
  "payload": {
    "userId": "string",
    "status": "string ('Online', 'Away', 'Offline')",
    "lastActive": "timestamp"
  }
}
```

### `message:new`
- **Trigger:** A new chat message is sent.
- **Payload:**
```json
{
  "event": "message:new",
  "payload": {
    "messageId": "string",
    "chatId": "string",
    "senderId": "string",
    "content": "string",
    "timestamp": "timestamp"
  }
}
```

### `message:read`
- **Trigger:** A user reads messages in a chat.
- **Payload:**
```json
{
  "event": "message:read",
  "payload": {
    "chatId": "string",
    "readerId": "string",
    "lastReadTimestamp": "timestamp"
  }
}
```

### `tripping:scheduled`
- **Trigger:** Superadmin finalizes a tripping request.
- **Payload:** (Broadcast to the relevant agent)
```json
{
  "event": "tripping:scheduled",
  "payload": {
    "requestId": "string",
    "agentId": "string",
    "clientName": "string",
    "scheduledDate": "timestamp",
    "message": "Your tripping request for [Client Name] has been scheduled."
  }
}
```

### `payment:validated`
- **Trigger:** Admin validates a payment.
- **Payload:** (Broadcast to the relevant agent)
```json
{
  "event": "payment:validated",
  "payload": {
    "paymentId": "string",
    "agentId": "string",
    "clientName": "string",
    "amount": "number",
    "message": "Your payment of [Amount] for [Client Name] has been validated. Commission is being processed."
  }
}
```

### `promotion:approved`
- **Trigger:** Superadmin approves a promotion.
- **Payload:** (Broadcast to the relevant agent)
```json
{
  "event": "promotion:approved",
  "payload": {
    "applicationId": "string",
    "agentId": "string",
    "newName": "string",
    "newRole": "string",
    "message": "Congratulations, [Agent Name]! Your promotion to [New Role] has been approved."
  }
}
```
