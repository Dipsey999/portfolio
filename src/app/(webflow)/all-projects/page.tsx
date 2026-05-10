import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All projects",
  description: "Mohammed Jizan K — Product Designer based in Bengaluru, India.",
};

const html = `<div id="Nab-Bar" class="header-container">
    <div class="header">
      <a href="/" class="link-box w-inline-block">
        <div class="label-small disabled">Home</div>
      </a>
      <a href="/all-projects/" aria-current="page" class="link-block w-inline-block w--current"><div class="label-small selected">Projects</div>
      </a>
      <a href="/about-me/" class="link-block-10 w-inline-block">
        <div class="label-small disabled">About Me</div>
      </a>
    </div>
  </div>
  <div class="projects-session-landing">
    <div class="project-landing-content">
      <div class="frame-26903">
        <div class="project-landing-heading-wrapper">
          <div class="projects-landing-h1 child-1">Designs</div>
          <div id="w-node-_810588a3-5dbd-5ab4-769b-3c6d5b081d1b-7fcc0731" class="projects-landing-h1 child-2">I Brought to Life</div>
        </div>
        <div class="projects-landing-paragraph-wrapper"><img src="/images/Vectors-Wrapper_9.svg" loading="lazy" width="100" height="100" alt="" class="vectors-wrapper-18">
          <div class="project-landing-paragraph-style landing">Products, websites, logos, 3D models, and VR experiences : a collection of design work crafted with clarity, purpose, and user-first thinking. </div>
        </div>
      </div>
      <div class="w-layout-vflex flex-block-2">
        <div class="spline-watch" data-animation-type="spline" data-spline-url="https://prod.spline.design/MJINkUWt1SjkaMut/scene.splinecode"><canvas></canvas></div>
      </div>
    </div>
    <div class="w-layout-vflex flex-block">
      <div class="white-block-container">
        <div class="white-block-1"></div>
        <div class="white-block-2"></div><img src="/images/Vectors-Wrapper_10.svg" loading="lazy" width="100" height="100" alt="" class="vectors-wrapper-22">
      </div>
      <div class="frame-26906">
        <div class="text-11">Dive into design <br>with purpose.</div><img src="/images/Arrow-down.png" loading="lazy" alt="" class="icon-arrow-down">
      </div>
    </div>
  </div>
  <div class="project-sessions case-study">
    <div class="project-casestudy-wrapper">
      <div class="project-casestudy-heading-container">
        <div class="projects-landing-h1 case-study-h1 case-study">Case Studies</div>
        <div class="project-landing-paragraph-style">Explore how I approach problems, shape ideas, and design products from discovery to delivery.</div>
      </div>
    </div>
    <div class="projects-wrapper-zl case-studies">
        <!--Start Recotap-->
        <a href="/more/password/" target="_blank" class="project w-inline-block" onclick="localStorage.setItem('caseKey', 'recotap')">
          <!-- <img src="/images/recotap-cs-1.png" loading="lazy" width="192" height="192" alt="" 
            srcset="/images/Zunu-Drive-p-500.png 500w, images/Zunu-Drive.png 768w" 
            sizes="(max-width: 479px) 88vw, (max-width: 767px) 87vw, (max-width: 991px) 37vw, 22vw" 
            class="vectors-wrapper-16"> -->
          <img src="/images/recotap-cs-1.png" loading="lazy" width="192" height="192" alt="Recotap Case Study" 
          srcset="/images/recotap-cs-1-500.png 500w, images/recotap-cs-1.png 768w" 
          sizes="(max-width: 479px) 88vw, (max-width: 767px) 87vw, (max-width: 991px) 37vw, 22vw" 
          class="vectors-wrapper-16">
        
          <div class="w-layout-vflex text-projects-casestudy-name">
            
            <!-- Title + Tag (Styled Inline) -->
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="label-small-11">RECOTAP</div>
              
            </div>
        
            <!-- Subtitle -->
            <div class="text-zunu">Improving Recotap to an Advanced ABM Platform.</div>
          </div>
        </a>
        <!--End Recotap-->

        <!--Start Hiresense-->
        <a href="/more/password/" target="_blank" class="project w-inline-block" onclick="localStorage.setItem('caseKey', 'hiresense')">
          <!-- <img src="/images/recotap-cs-1.png" loading="lazy" width="192" height="192" alt="" 
            srcset="/images/Zunu-Drive-p-500.png 500w, images/Zunu-Drive.png 768w" 
            sizes="(max-width: 479px) 88vw, (max-width: 767px) 87vw, (max-width: 991px) 37vw, 22vw" 
            class="vectors-wrapper-16"> -->
            <img src="/images/hiresense-img.png" loading="lazy" width="192" height="192" alt="Hiresense Case Study" 
            srcset="/images/hiresense-img-500.png 500w, images/hiresense-img.png 768w" 
            sizes="(max-width: 479px) 88vw, (max-width: 767px) 87vw, (max-width: 991px) 37vw, 22vw" 
            class="vectors-wrapper-16">
        
          <div class="w-layout-vflex text-projects-casestudy-name">
            
            <!-- Title + Tag (Styled Inline) -->
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="label-small-11">HIRESENSE</div>
            </div>
        
            <!-- Subtitle -->
            <div class="text-zunu">Crafting Talent Intelligence for Visionaries.</div>
          </div>
        </a>
        <!--End Hiresense-->


        <a href="/case-study/zunu-drive/" class="project w-inline-block"><img src="/images/Zunu-Drive.png" loading="lazy" width="192" height="192" alt="" srcset="/images/Zunu-Drive-p-500.png 500w, images/Zunu-Drive.png 768w" sizes="(max-width: 479px) 88vw, (max-width: 767px) 82vw, (max-width: 991px) 37vw, (max-width: 1279px) 24vw, (max-width: 1439px) 25vw, 32vw" class="vectors-wrapper-16">
          <div class="w-layout-vflex text-projects-casestudy-name">
            <div class="label-small-11">ZUNU DRIVE</div>
           <div class="text-zunu">Designing the Future of Secure Storage.</div>
          </div>
        </a>

    </div>
    <div class="w-layout-vflex flex-block">
      <div class="frame-26906">
        <div class="text-11">Dive into design <br>with purpose.</div><img src="/images/Arrow-down.png" loading="lazy" alt="" class="icon-arrow-down">
      </div>
    </div>
  </div>
  <div class="pattern-container">
    <div class="pattern _1"></div>
    <div class="pattern _2"></div>
  </div>
  <div class="project-sessions websites">
    <div class="project-casestudy-wrapper">
      <div class="project-casestudy-heading-container websites">
        <div class="projects-landing-h1 case-study-h1 websites">Websites</div>
      </div>
    </div>
    <div class="w-layout-vflex projects-website-container">
      <div class="website-card zunu">
        <div class="website-card-details">
          <div class="website-card-header-container">
            <div class="website-card-name">Zunu Suit</div>
            <div class="website-card-des">The most advanced Privacy-Preserving Software For business about the website.</div>
          </div>
          <a href="https://zunuprivacy.com/" target="_blank" class="view-website w-inline-block">
            <div class="text-13">View ↗</div>
          </a>
        </div>
        <div id="w-node-_4de2c049-2400-b6f8-700c-e31d8e5cf9f9-7fcc0731" class="website-card-image-container"><img src="/images/zunu-website.png" loading="lazy" sizes="(max-width: 479px) 91vw, (max-width: 767px) 67vw, (max-width: 991px) 335.0625px, (max-width: 1439px) 52vw, 696.46875px" srcset="/images/zunu-website-p-500.png 500w, images/zunu-website-p-800.png 800w, images/zunu-website-p-1080.png 1080w, images/zunu-website-p-1600.png 1600w, images/zunu-website-p-2000.png 2000w, images/zunu-website-p-2600.png 2600w, images/zunu-website-p-3200.png 3200w, images/zunu-website.png 6048w" alt="" class="image-website-zunu"></div>
      </div>
      <div class="website-card camelia-group">
        <div class="website-card-details">
          <div class="website-card-header-container">
            <div class="website-card-name">Kamelia Groups</div>
          </div>
          <a href="https://kameliagroup.com/" target="_blank" class="link-block-6 w-inline-block">
            <div class="text-13">View ↗</div>
          </a>
        </div>
        <div id="w-node-dfcbe46d-6875-2f9b-67df-1f92efe44cac-7fcc0731" class="website-card-image-container"><img src="/images/Kamelia.png" loading="lazy" sizes="(max-width: 479px) 91vw, (max-width: 767px) 67vw, (max-width: 991px) 335.0625px, (max-width: 1439px) 52vw, 696.46875px" srcset="/images/Kamelia-p-500.png 500w, images/Kamelia-p-800.png 800w, images/Kamelia-p-1080.png 1080w, images/Kamelia-p-1600.png 1600w, images/Kamelia-p-2000.png 2000w, images/Kamelia-p-2600.png 2600w, images/Kamelia-p-3200.png 3200w, images/Kamelia.png 4536w" alt="" class="image-website-zunu"></div>
      </div>
      <div class="website-card _9-homes">
        <div class="website-card-details">
          <div class="website-card-header-container">
            <div class="website-card-name">Nine Homes</div>
            <div class="website-card-des">Distinguished Real-estate company with a wealth of experience and a loyal global clientele.</div>
          </div>
          <a href="https://www.nine9homes.com/" target="_blank" class="view-website w-inline-block">
            <div class="text-13">View ↗</div>
          </a>
        </div>
        <div id="w-node-_3095b429-70d9-3e0e-f39f-5d70727207cc-7fcc0731" class="website-card-image-container"><img src="/images/9-homes.png" loading="lazy" sizes="(max-width: 479px) 91vw, (max-width: 767px) 67vw, (max-width: 991px) 335.0625px, (max-width: 1439px) 52vw, 696.46875px" srcset="/images/9-homes-p-500.png 500w, images/9-homes-p-800.png 800w, images/9-homes-p-1080.png 1080w, images/9-homes-p-1600.png 1600w, images/9-homes-p-2000.png 2000w, images/9-homes-p-2600.png 2600w, images/9-homes.png 3024w" alt="" class="image-website-zunu"></div>
      </div>
      <div class="website-card foxpatch">
        <div class="website-card-details">
          <div class="website-card-header-container">
            <div class="website-card-name">Foxpatch</div>
            <div class="website-card-des">A Quality Design Agency to Grow Your Business</div>
          </div>
          <a href="https://foxpatch.in/" target="_blank" class="view-website w-inline-block">
            <div class="text-13">View ↗</div>
          </a>
        </div>
        <div id="w-node-_85de7e72-f520-7352-2539-c99849a31160-7fcc0731" class="website-card-image-container"><img src="/images/foxpatch-website.png" loading="lazy" sizes="(max-width: 479px) 91vw, (max-width: 767px) 67vw, (max-width: 991px) 335.0625px, (max-width: 1439px) 52vw, 696.46875px" srcset="/images/foxpatch-website-p-500.png 500w, images/foxpatch-website-p-800.png 800w, images/foxpatch-website-p-1080.png 1080w, images/foxpatch-website-p-1600.png 1600w, images/foxpatch-website-p-2000.png 2000w, images/foxpatch-website-p-2600.png 2600w, images/foxpatch-website-p-3200.png 3200w, images/foxpatch-website.png 6048w" alt="" class="image-website-zunu"></div>
      </div>
    </div>
  </div>
  <div class="pattern-container xx1">
    <div class="pattern _2 x1 branding"></div>
    <div class="pattern _1 x1 branding"></div>
  </div>
  <div class="project-sessions branding">
    <div class="project-casestudy-wrapper">
      <div class="project-casestudy-heading-container branding">
        <div class="projects-landing-h1 case-study-h1 case-study">Branding</div>
        <div class="project-landing-paragraph-style branding">Crafting distinct identities that resonate. Dive into logos and guidelines that transform ideas into lasting impressions.</div>
      </div>
    </div>
    <div class="projects-wrapper-zl">
      <div class="projects-branding-card"><img src="/images/zunu-branding_1-p-500.png" loading="lazy" alt="" class="image-branding-zunu"></div>
      <div class="projects-branding-card"><img src="/images/foxpatch.png" loading="lazy" sizes="100vw" srcset="/images/foxpatch-p-500.png 500w, images/foxpatch-p-800.png 800w, images/foxpatch-p-1080.png 1080w, images/foxpatch-p-1600.png 1600w, images/foxpatch-p-2000.png 2000w, images/foxpatch-p-2600.png 2600w, images/foxpatch.png 2699w" alt="" class="image-branding-zunu"></div>
      <div class="projects-branding-card"><img src="/images/UnQ-SCS.png" loading="lazy" sizes="100vw" srcset="/images/UnQ-SCS-p-500.png 500w, images/UnQ-SCS-p-800.png 800w, images/UnQ-SCS-p-1080.png 1080w, images/UnQ-SCS-p-1600.png 1600w, images/UnQ-SCS-p-2000.png 2000w, images/UnQ-SCS-p-2600.png 2600w, images/UnQ-SCS.png 2699w" alt="" class="image-branding-zunu"></div>
      <div class="projects-branding-card"><img src="/images/Trafitizer.png" loading="lazy" sizes="100vw" srcset="/images/Trafitizer-p-500.png 500w, images/Trafitizer-p-800.png 800w, images/Trafitizer-p-1080.png 1080w, images/Trafitizer-p-1600.png 1600w, images/Trafitizer-p-2000.png 2000w, images/Trafitizer-p-2600.png 2600w, images/Trafitizer.png 2742w" alt="" class="image-branding-zunu"></div>
      <div class="projects-branding-card"><img src="/images/cofco.png" loading="lazy" sizes="100vw" srcset="/images/cofco-p-500.png 500w, images/cofco-p-800.png 800w, images/cofco-p-1080.png 1080w, images/cofco-p-1600.png 1600w, images/cofco-p-2000.png 2000w, images/cofco-p-2600.png 2600w, images/cofco.png 2699w" alt="" class="image-branding-zunu"></div>
    </div>
  </div>
  <div class="pattern-container _3d-objects">
    <div class="pattern _2 x1"></div>
    <div class="pattern _1 x1"></div>
  </div>
  <div class="w-layout-vflex sessions-container game-designer">
    <div class="project-casestudy-heading-container _3d-odessey">
      <div class="projects-landing-h1 case-study-h1 case-study">3D Odyssey</div>
      <div class="project-landing-paragraph-style">Bringing objects to life with depth and detail. Explore creations that leap off the screen and captivate the senses.</div>
    </div>
    <div class="spline-hand" data-animation-type="spline" data-spline-url="https://prod.spline.design/Er5iFtlph2UQ5MG4/scene.splinecode"><canvas></canvas></div>
  </div>
  <div class="w-layout-vflex sessions-container vision-pro-designer">
    <div class="project-casestudy-heading-container _3d-odessey">
      <div class="projects-landing-h1 case-study-h1 case-study apple-vision-pro">Design for Apple Vision OS</div>
      <a href="/404/" class="link-block-8 w-inline-block">
        <div class="project-landing-paragraph-style">Learn More ↗</div>
      </a>
    </div>
    <div class="spline-hand" data-animation-type="spline" data-spline-url="https://prod.spline.design/6MuxRlrkADDgdBOp/scene.splinecode"><canvas></canvas></div>
  </div>
  <div id="Nab-Bar" class="header-container last">
    <div class="header">
      <a href="/" class="link-box w-inline-block">
        <div class="label-small disabled">Home</div>
      </a>
      <a href="/all-projects/" aria-current="page" class="link-block w-inline-block w--current">
        <div class="label-small selected">Projects</div>
      </a>
      <a href="/about-me/" class="link-block-9 w-inline-block">
        <div class="label-small disabled">About Me</div>
      </a>
    </div>
  </div>`;

export default function Page() {
  return (
    <div className="body-projects new" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
