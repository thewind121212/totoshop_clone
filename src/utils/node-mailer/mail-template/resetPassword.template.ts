
export const resetPasswordTemplate = (to_name: string, verify_link:string) => {
    return  `
    <div>&nbsp;</div>
<p>Hi ${to_name},</p>
<p>We received a request to reset your password on EmailJS. Please follow the instructions below to reset your password:</p>
<p>Click the link below to reset your password:</p>
<p><a style="font-weight: 500; display: inline-block; padding: 10px 35px; margin: 8px 0; text-decoration: none; border-radius: 3px; background-color: #00b156; color: #ffffff;" href="${verify_link}" target="_blank" rel="noopener" data-saferedirecturl="${verify_link}">Reset Password</a></p>
<p>This link will expire in 48 hours.</p>
<p>If you didn't request to reset your password, you can safely ignore this email.</p>
<p>If you're having trouble clicking the button, copy and paste the URL below into your browser:</p>
<p>${verify_link}</p>
<p>Please contact us if you have any questions or need further assistance.</p>
<hr>
<p>All the best,<br><strong>The EmailJS Team</strong></p>
<hr>
<p>If you didn't request a password reset, please let us know by calling us at 0918327132.</p>
<hr>
<table>
<tbody>
<tr>
<td>EmailJS.com, All rights reserved.</td>
<td>
<div>Follow us on&nbsp;<a href="https://www.facebook.com/tranduylinh.linh.5/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/EmailJS_com&amp;source=gmail&amp;ust=1688100786911000&amp;usg=AOvVaw2joAfqKl_reVhcrx52Ypiu">Facebook</a></div>
</td>
</tr>
<tr>
<td>You have received this email because you have an account with us.</td>
</tr>
</tbody>
</table>
    `

}