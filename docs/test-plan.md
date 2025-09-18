# Mount Moriah Agent Hub - Test Plan

This document outlines high-level test plans and acceptance criteria for key features.

## 1. UX Acceptance Criteria & Performance SLOs

### Performance SLOs
- **Presence Latency:** User status changes (Online, Offline, Away) must reflect in the Admin Dashboard for other users within **5 seconds** under normal network conditions (LTE, broadband).
- **Message Round-Trip Time:** Time from a user sending a message to it appearing on the recipient's screen must be under **2 seconds** on stable mobile networks.
- **Page Load (Initial):** The application's initial load time to the login screen should be under **3 seconds** on a fast 3G connection.
- **Page Transition:** Navigating between pages after the initial load should feel instantaneous, with a target of **< 500ms** for rendering the next page skeleton.

### UX Acceptance Criteria
1.  **Role-Based Access:**
    - A user logged in as `Agent` CANNOT access `/settings` or `/admin/dashboard`. They should be redirected to `/dashboard`.
    - A user logged in as `Manager` or `Admin` CAN access `/admin/dashboard` but CANNOT access `/settings`.
    - A user logged in as `Superadmin` CAN access all pages, including `/settings`.
    - The sidebar navigation MUST dynamically render only the links appropriate for the user's role.

2.  **Site Tripping Request Flow:**
    - The `Preferred date` field MUST disable past dates.
    - The form CANNOT be submitted if the `Client Photo Proof` is not attached. A user-friendly error message must be shown.
    - On successful submission, the agent should receive a confirmation, and the request should appear in the Admin Dashboard's "Approval Queues".

3.  **Promotion Application Flow:**
    - The "Apply for Promotion" button or form is only enabled if the system's auto-check confirms eligibility based on `Settings_PromotionCriteria`.
    - If the user is ineligible, the UI must clearly indicate which criteria have not yet been met.
    - On successful submission, the application appears in the Admin Dashboard's "Approval Queues" for manager endorsement.

---

## 2. Test Case: Commission Calculation Validation

This test case uses the "Bulk Example" from page 4 of the `Mt. Moriah Agent Handbook.pdf`.

### Test Scenario:
Validate the commission calculation for an Agent, Unit Marketing Manager (UMM), and Broker/Owner on a bulk sale.

### Sample Data (from handbook):
- **Sale:** 3 lots x 300 sqm/lot = 900 sqm total
- **Price per sqm:** ₱5,000
- **Total Price:** 900 sqm * ₱5,000/sqm = **₱4,500,000**
- **Agent Commission Rate:** 4%
- **UMM Override Rate:** 1% (5% total rate - 4% agent rate)
- **Broker/Owner Rate:** 7% (This seems to be direct, not override, in the example. The system should clarify override logic. Let's assume a 2% override over the UMM).

### Test Steps:
1.  **Login as an Admin.**
2.  **Navigate to the Sales/Payments section.**
3.  **Create a new payment record with the following details:**
    - `agentId`: An agent who is under a UMM.
    - `lotCode`: "BULK-SALE-01"
    - `amount`: 4,500,000
    - `paymentDate`: Today's date
    - `proofUrl`: Upload a sample image.
4.  **Validate the payment.** This action should trigger the commission engine.
5.  **Navigate to the Commissions records.**
6.  **Verify the generated commission rows.**

### Expected Results:
The system should generate three separate commission records linked to the validated payment:

1.  **Agent's Direct Commission:**
    - `agentId`: The direct Sales Agent.
    - `type`: 'Direct'
    - `commissionAmount`: ₱4,500,000 * 4% = **₱180,000**
    - **Verification:** Check if the calculated amount matches the handbook example.

2.  **Unit Marketing Manager's (UMM) Override:**
    - `agentId`: The UMM of the Sales Agent.
    - `type`: 'Override'
    - `commissionAmount`: ₱4,500,000 * 1% = **₱45,000**
    - **Note:** The handbook shows `(5%) = P225,000`, which is a direct commission calculation, not an override. The test should validate against the implemented override logic (UMM Rate - Agent Rate). The spec must clarify this discrepancy. For this test, we assume a 1% override.

3.  **Broker/Owner's Override:**
    - `agentId`: The Broker/Owner.
    - `type`: 'Override'
    - `commissionAmount`: ₱4,500,000 * 2% = **₱90,000**
    - **Note:** The handbook shows `(7%) = P315,000`. This is also a direct calculation. This test assumes a 2% override on top of the UMM's 5% rate (7% - 5%). The business logic for commission cascading must be confirmed.

**Conclusion:** The test passes if the `Direct` commission for the agent is correct, and override commissions are generated for the agent's upline according to the defined cascading rules in the system settings. Any discrepancy with the handbook examples should be flagged for clarification with the project manager.
