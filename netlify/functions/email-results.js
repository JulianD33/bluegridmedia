const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "contact@bluegridmedia.com";
const FROM_NAME = "Blue Grid Media";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    /* 🐝 Honeypot check */
    if (body["bot"] || body["website_url"] || body["bot-field"]) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    const email = (body.email || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Invalid email address." })
      };
    }

    const name       = (body.name     || "").trim() || "there";
    const business   = (body.business || "").trim();

    const industry       = body.industry      || "N/A";
    const market         = body.market        || "N/A";
    const budget         = body.budget        || "N/A";
    const jobValue       = body.job_value     || "N/A";
    const estimatedCpl   = body.estimated_cpl || "N/A";
    const leadsPerMonth  = body.leads_per_month || "N/A";
    const bookedJobs     = body.booked_jobs   || "N/A";
    const costPerJob     = body.cost_per_job  || "N/A";
    const monthlyRevenue = body.monthly_revenue || "N/A";
    const roas           = body.roas          || "N/A";
    const ltv            = body.ltv           || null;
    const ltvRoas        = body.ltv_roas      || null;

    const businessLine = business
      ? `<p style="margin:0 0 4px;"><strong>Business:</strong> ${escHtml(business)}</p>`
      : "";

    const ltvRows = ltv
      ? `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Customer Lifetime Value</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(ltv)}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">LTV-Adjusted ROAS</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(ltvRoas || "N/A")}</td>
        </tr>`
      : "";

    const marketLabel =
      market === "small" ? "Small market / rural" :
      market === "large" ? "Large / competitive metro" :
      "Mid-size market";

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your LSA ROI Calculator Results</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f2d4e,#0ea5a4);padding:32px 36px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#d1fafa;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Blue Grid Media</p>
              <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">Your LSA ROI Calculator Results</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 36px 0;">
              <p style="margin:0 0 8px;font-size:16px;color:#0f172a;font-weight:600;">Hi ${escHtml(name)},</p>
              ${businessLine}
              <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.6;">
                Here are your personalized Google LSA ROI estimates based on the inputs you entered. Use these numbers to evaluate whether Local Services Ads make sense for your business — and how to improve your economics.
              </p>
            </td>
          </tr>

          <!-- Inputs summary -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;font-weight:700;">Your Inputs</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 14px;font-size:13px;color:#64748b;width:50%;">Industry</td>
                  <td style="padding:8px 14px;font-size:13px;font-weight:600;text-transform:capitalize;">${escHtml(industry.replace(/-/g, " "))}</td>
                </tr>
                <tr>
                  <td style="padding:8px 14px;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;">Market Size</td>
                  <td style="padding:8px 14px;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">${escHtml(marketLabel)}</td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 14px;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;">Monthly Budget</td>
                  <td style="padding:8px 14px;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">$${escHtml(String(budget))}</td>
                </tr>
                <tr>
                  <td style="padding:8px 14px;font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;">Average Job Value</td>
                  <td style="padding:8px 14px;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">$${escHtml(String(jobValue))}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Results -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;font-weight:700;">Your Estimated Results</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Estimated CPL</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;font-size:18px;color:#0ea5a4;">${escHtml(estimatedCpl)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Leads Per Month</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(leadsPerMonth)}</td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Booked Jobs / Month</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(bookedJobs)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Cost Per Booked Job</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(costPerJob)}</td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Monthly Revenue from LSA</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;font-size:14px;">${escHtml(monthlyRevenue)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;${ltv ? "border-bottom:1px solid #e2e8f0;" : ""}color:#64748b;font-size:14px;">ROAS</td>
                  <td style="padding:10px 14px;${ltv ? "border-bottom:1px solid #e2e8f0;" : ""}font-weight:700;font-size:18px;color:#0ea5a4;">${escHtml(roas)}</td>
                </tr>
                ${ltvRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0f2d4e,#1a4a7a);border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:24px 28px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:16px;color:#ffffff;font-weight:700;">Want to know what these numbers look like for your specific market?</p>
                    <p style="margin:0 0 18px;font-size:13px;color:#cbd5e1;line-height:1.6;">A free LSA audit gives you exact numbers — what competitors are spending, what CPL to expect, and what's holding back your lead volume.</p>
                    <a href="https://bluegridmedia.com/contact" style="display:inline-block;background:#ffffff;color:#0f2d4e;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">Get a Free LSA Audit &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 36px 28px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:20px 0 4px;font-size:12px;color:#94a3b8;">Blue Grid Media &middot; Independent LSA Specialists</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                <a href="https://bluegridmedia.com" style="color:#0ea5a4;text-decoration:none;">bluegridmedia.com</a> &middot;
                <a href="mailto:contact@bluegridmedia.com" style="color:#0ea5a4;text-decoration:none;">contact@bluegridmedia.com</a>
              </p>
              <p style="margin:10px 0 0;font-size:11px;color:#cbd5e1;">You received this because you requested your LSA ROI results. No spam, ever.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const textBody = `Your LSA ROI Calculator Results — Blue Grid Media

Hi ${name},

Here are your personalized Google LSA ROI estimates:

INPUTS
------
Industry: ${industry.replace(/-/g, " ")}
Market: ${marketLabel}
Monthly Budget: $${budget}
Average Job Value: $${jobValue}

RESULTS
-------
Estimated CPL: ${estimatedCpl}
Leads Per Month: ${leadsPerMonth}
Booked Jobs / Month: ${bookedJobs}
Cost Per Booked Job: ${costPerJob}
Monthly Revenue from LSA: ${monthlyRevenue}
ROAS: ${roas}${ltv ? `\nCustomer Lifetime Value: ${ltv}\nLTV-Adjusted ROAS: ${ltvRoas || "N/A"}` : ""}

Want exact numbers for your market? Get a free LSA audit:
https://bluegridmedia.com/contact

—
Blue Grid Media · bluegridmedia.com
`;

    /* Send to the user */
    await sgMail.send({
      to: email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: FROM_EMAIL,
      subject: "Your Google LSA ROI Calculator Results",
      text: textBody,
      html: htmlBody
    });

    /* Notify the Blue Grid inbox */
    await sgMail.send({
      to: FROM_EMAIL,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: email,
      subject: `[LSA Calculator] Results requested by ${email}`,
      text: `New calculator results email sent.\n\nTo: ${email}\nName: ${name}\nBusiness: ${business || "N/A"}\n\n${textBody}`
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    console.error("email-results error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Failed to send email." })
    };
  }
};

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
