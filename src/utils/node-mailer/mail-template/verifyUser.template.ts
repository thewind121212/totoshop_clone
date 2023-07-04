export const verifyUserTemplate = (to_name: string, to_email: string, verify_link:string) => {
    return `<div>&nbsp;</div>
    <p>Hi ${to_name},</p>
    <p>Thank you for signing up on EmailJS! We're excited to have you on board and will be happy to help you set everything up.</p>
    <p>Please click the link below to verify your email address: ${to_email}</p>
    <p><a style="font-weight: 500; display: inline-block; padding: 10px 35px; margin: 8px 0; text-decoration: none; border-radius: 3px; background-color: #00b156; color: #ffffff;" href="${verify_link}" target="_blank" rel="noopener" data-saferedirecturl="${verify_link}">Verify email</a></p>
    <p>This link will expire in 48 hours.</p>
    <p>If you're having trouble clicking the button, copy and paste the URL below into your browser:</p>
    <p>${verify_link}</p>
    <p>Please let us know if you have any questions, feature requests, or general feedback simply by replying to this email.</p>
    <p>We suggest following us on Twitter to stay up to date with all the changes in the service.</p>
    <hr>
    <p>All the best,<br><strong>The Link Crew</strong></p>
    <hr>
    <p>If you didn't create this account, please let us know by call me 0918327132&nbsp;</p>
    <hr>
    <table>
    <tbody>
    <tr>
    <td>Linh.com, All rights reserved.</td>
    <td>
    <div>Follow us on&nbsp;<a href="https://www.facebook.com/tranduylinh.linh.5/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/EmailJS_com&amp;source=gmail&amp;ust=1688100786911000&amp;usg=AOvVaw2joAfqKl_reVhcrx52Ypiu">Facebook</a></div>
    </td>
    </tr>
    <tr>
    <td>You have received this email because you opted in at our website.</td>
    </tr>
    </tbody>
    </table>`

}