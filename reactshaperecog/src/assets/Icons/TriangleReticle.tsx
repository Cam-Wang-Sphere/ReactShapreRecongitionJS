import { SVGProps } from "react";
import * as React from "react";

const arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path d="M0 0h1024v1024H0V0z" fill="white" opacity="0" />
    <path d="M0 0H1024V1024H0V0Z" fill="white" opacity="0" />
    <mask id="path-1-inside-1_96_696" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M460.999 628.037L462.739 628.041L450.547 649H230L242.869 627.522L522.656 145L803.277 628.871L815 649H595.755L583.772 628.352L584.358 628.354L576.883 615.401L752.545 615.821L522.14 216.264L292.435 614.7L468.471 615.12L460.999 628.037ZM485 725V706H564V725H533V785H564V803H533V863H516V803H485V785H516V725H485ZM527 464C535.837 464 543 457.06 543 448.5C543 439.94 535.837 433 527 433C518.163 433 511 439.94 511 448.5C511 457.06 518.163 464 527 464ZM543 537C543 545.837 535.837 553 527 553C518.163 553 511 545.837 511 537C511 528.163 518.163 521 527 521C535.837 521 543 528.163 543 537ZM527 646C535.837 646 543 638.613 543 629.5C543 620.387 535.837 613 527 613C518.163 613 511 620.387 511 629.5C511 638.613 518.163 646 527 646Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M460.999 628.037L462.739 628.041L450.547 649H230L242.869 627.522L522.656 145L803.277 628.871L815 649H595.755L583.772 628.352L584.358 628.354L576.883 615.401L752.545 615.821L522.14 216.264L292.435 614.7L468.471 615.12L460.999 628.037ZM485 725V706H564V725H533V785H564V803H533V863H516V803H485V785H516V725H485ZM527 464C535.837 464 543 457.06 543 448.5C543 439.94 535.837 433 527 433C518.163 433 511 439.94 511 448.5C511 457.06 518.163 464 527 464ZM543 537C543 545.837 535.837 553 527 553C518.163 553 511 545.837 511 537C511 528.163 518.163 521 527 521C535.837 521 543 528.163 543 537ZM527 646C535.837 646 543 638.613 543 629.5C543 620.387 535.837 613 527 613C518.163 613 511 620.387 511 629.5C511 638.613 518.163 646 527 646Z"
      fill="#B5D034"
    />
    <path
      d="M462.739 628.041L561.28 685.362L660.665 514.509L463.009 514.041L462.739 628.041ZM460.999 628.037L362.318 570.957L263.631 741.57L460.729 742.037L460.999 628.037ZM450.547 649V763H516.118L549.088 706.321L450.547 649ZM230 649L132.211 590.406L28.7945 763H230V649ZM242.869 627.522L340.658 686.116L341.079 685.414L341.489 684.707L242.869 627.522ZM522.656 145L621.272 87.8079L522.647 -82.2497L424.036 87.8157L522.656 145ZM803.277 628.871L704.661 686.063L704.714 686.153L704.766 686.243L803.277 628.871ZM815 649V763H1013.32L913.511 591.628L815 649ZM595.755 649L497.158 706.224L530.109 763H595.755V649ZM583.772 628.352L584.045 514.353L385.524 513.877L485.174 685.576L583.772 628.352ZM584.358 628.354L584.085 742.353L782.044 742.827L683.095 571.372L584.358 628.354ZM576.883 615.401L577.156 501.401L379.197 500.927L478.146 672.383L576.883 615.401ZM752.545 615.821L752.272 729.821L950.152 730.295L851.302 558.873L752.545 615.821ZM522.14 216.264L620.897 159.316L522.129 -11.9634L423.378 159.326L522.14 216.264ZM292.435 614.7L193.672 557.761L95.3949 728.229L292.163 728.699L292.435 614.7ZM468.471 615.12L567.151 672.2L665.836 501.592L468.743 501.121L468.471 615.12ZM485 706V592H371V706H485ZM485 725H371V839H485V725ZM564 706H678V592H564V706ZM564 725V839H678V725H564ZM533 725V611H419V725H533ZM533 785H419V899H533V785ZM564 785H678V671H564V785ZM564 803V917H678V803H564ZM533 803V689H419V803H533ZM533 863V977H647V863H533ZM516 863H402V977H516V863ZM516 803H630V689H516V803ZM485 803H371V917H485V803ZM485 785V671H371V785H485ZM516 785V899H630V785H516ZM516 725H630V611H516V725ZM463.009 514.041L461.269 514.037L460.729 742.037L462.469 742.041L463.009 514.041ZM549.088 706.321L561.28 685.362L364.198 570.72L352.007 591.679L549.088 706.321ZM230 763H450.547V535H230V763ZM145.08 568.928L132.211 590.406L327.789 707.594L340.658 686.116L145.08 568.928ZM424.036 87.8157L144.249 570.338L341.489 684.707L621.277 202.184L424.036 87.8157ZM901.893 571.679L621.272 87.8079L424.041 202.192L704.661 686.063L901.893 571.679ZM913.511 591.628L901.788 571.499L704.766 686.243L716.489 706.372L913.511 591.628ZM595.755 763H815V535H595.755V763ZM485.174 685.576L497.158 706.224L694.353 591.776L682.369 571.129L485.174 685.576ZM584.631 514.354L584.045 514.353L583.499 742.352L584.085 742.353L584.631 514.354ZM478.146 672.383L485.621 685.336L683.095 571.372L675.62 558.418L478.146 672.383ZM752.818 501.822L577.156 501.401L576.61 729.4L752.272 729.821L752.818 501.822ZM423.383 273.212L653.788 672.77L851.302 558.873L620.897 159.316L423.383 273.212ZM391.197 671.638L620.903 273.202L423.378 159.326L193.672 557.761L391.197 671.638ZM468.743 501.121L292.707 500.7L292.163 728.699L468.198 729.12L468.743 501.121ZM559.68 685.117L567.151 672.2L369.79 558.041L362.318 570.957L559.68 685.117ZM371 706V725H599V706H371ZM564 592H485V820H564V592ZM678 725V706H450V725H678ZM533 839H564V611H533V839ZM647 785V725H419V785H647ZM564 671H533V899H564V671ZM678 803V785H450V803H678ZM533 917H564V689H533V917ZM647 863V803H419V863H647ZM516 977H533V749H516V977ZM402 803V863H630V803H402ZM485 917H516V689H485V917ZM371 785V803H599V785H371ZM516 671H485V899H516V671ZM402 725V785H630V725H402ZM485 839H516V611H485V839ZM429 448.5C429 390.715 476.315 350 527 350V578C595.358 578 657 523.405 657 448.5H429ZM527 547C476.315 547 429 506.285 429 448.5H657C657 373.594 595.358 319 527 319V547ZM625 448.5C625 506.285 577.685 547 527 547V319C458.642 319 397 373.594 397 448.5H625ZM527 350C577.685 350 625 390.715 625 448.5H397C397 523.405 458.642 578 527 578V350ZM527 667C598.797 667 657 608.797 657 537H429C429 482.876 472.876 439 527 439V667ZM397 537C397 608.797 455.203 667 527 667V439C581.124 439 625 482.876 625 537H397ZM527 407C455.203 407 397 465.203 397 537H625C625 591.124 581.124 635 527 635V407ZM657 537C657 465.203 598.797 407 527 407V635C472.876 635 429 591.124 429 537H657ZM429 629.5C429 578.984 469.595 532 527 532V760C602.078 760 657 698.241 657 629.5H429ZM527 727C469.595 727 429 680.016 429 629.5H657C657 560.759 602.078 499 527 499V727ZM625 629.5C625 680.016 584.405 727 527 727V499C451.922 499 397 560.759 397 629.5H625ZM527 532C584.405 532 625 578.984 625 629.5H397C397 698.241 451.922 760 527 760V532Z"
      fill="#B5D034"
      mask="url(#path-1-inside-1_96_696)"
    />
  </svg>
);

export default arrow;
