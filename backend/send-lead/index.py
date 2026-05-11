import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ТвояДверь на email менеджера."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Имя и телефон обязательны"},
        }

    smtp_email = os.environ.get("SMTP_EMAIL", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    if smtp_email and smtp_password:
        _send_email(smtp_email, smtp_password, name, phone, message)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"success": True},
    }


def _send_email(smtp_email: str, smtp_password: str, name: str, phone: str, message: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта ТвояДверь — {name}"
    msg["From"] = smtp_email
    msg["To"] = smtp_email

    text_body = f"""
Новая заявка с сайта ТвояДверь

Имя: {name}
Телефон: {phone}
Сообщение: {message or 'не указано'}
"""

    html_body = f"""
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1a1a1a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
    Новая заявка с сайта ТвояДверь
  </h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px 0; color: #666; width: 120px;">Имя:</td>
      <td style="padding: 10px 0; font-weight: bold; color: #1a1a1a;">{name}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #666;">Телефон:</td>
      <td style="padding: 10px 0; font-weight: bold; color: #1a1a1a;">
        <a href="tel:{phone}" style="color: #f97316;">{phone}</a>
      </td>
    </tr>
    {"" if not message else f'''<tr>
      <td style="padding: 10px 0; color: #666; vertical-align: top;">Сообщение:</td>
      <td style="padding: 10px 0; color: #1a1a1a;">{message}</td>
    </tr>'''}
  </table>
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    Заявка отправлена с сайта tvoya-dver.ru
  </p>
</div>
"""

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    if "yandex" in smtp_email or "ya.ru" in smtp_email:
        smtp_host, smtp_port = "smtp.yandex.ru", 465
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, smtp_email, msg.as_string())
    else:
        smtp_host, smtp_port = "smtp.gmail.com", 587
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, smtp_email, msg.as_string())