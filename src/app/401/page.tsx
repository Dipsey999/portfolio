import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Protected page",
  description: "Mohammed Jizan K — Product Designer based in Bengaluru, India.",
};

const html = `<div class="utility-page-wrap">
    <div class="utility-page-content w-password-page w-form">
      <form action="/.wf_auth" method="post" id="email-form" name="email-form" data-name="Email Form" class="utility-page-form w-password-page" data-wf-page-id="65298a6b62a75b83ea126a96" data-wf-element-id="65298a6b62a75b83ea126a9c00000000000c">
        <h2>Protected Page</h2><label for="pass" class="w-password-page">Password</label><input type="password" class="w-password-page w-input" autofocus="true" maxlength="256" name="pass" data-name="field" placeholder="Enter your password" id="pass"><input type="submit" value="Submit" data-wait="Please wait..." class="w-password-page w-button">
        <div class="w-password-page w-form-fail">
          <div>Incorrect password. Please try again.</div>
        </div>
        <div style="display:none" class="w-password-page w-embed w-script"><input type="hidden" name="path" value="<%WF_FORM_VALUE_PATH%>"><input type="hidden" name="page" value="<%WF_FORM_VALUE_PAGE%>"></div>
        <div style="display:none" class="w-password-page w-embed w-script">
          <script type="application/javascript">(function _handlePasswordPageOnload() {
	  if (/[?&]e=1(&|$)/.test(document.location.search)) {
	    document.querySelector('.w-password-page.w-form-fail').style.display = 'block';
	  }
	})()</script>
        </div>
      </form>
    </div>
  </div>`;

export default function Page() {
  return (
    <div className="body-2" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
