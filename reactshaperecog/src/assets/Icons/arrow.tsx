import { SVGProps } from "react";
import * as React from "react";

const arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path d="M0 0h1024v1024H0V0z" fill="white" opacity="0" />
    <path d="M0 0H1024V1024H0V0Z" fill="white" opacity="0" />
    <path
      d="M284 431C286.235 432.595 286.913 433.487 287.375 436.211C287.252 443.943 286.112 451.296 284.664 458.883C284.425 460.178 284.185 461.472 283.939 462.807C283.307 466.221 282.663 469.633 282.017 473.044C281.495 475.816 280.981 478.589 280.467 481.362C276.179 504.507 276.179 504.507 274 514H276V520C276.582 519.999 277.164 519.998 277.763 519.997C361.445 519.867 445.125 520.006 528.806 520.389C536.959 520.427 545.112 520.462 553.265 520.497C638.069 520.861 638.069 520.861 673.105 521.441C674.186 521.458 675.266 521.474 676.379 521.491C696.355 521.809 716.268 522.974 736.199 524.308C744.882 524.887 753.551 525.302 762.25 525.562C770.648 525.827 778.716 526.52 787 528C789.311 528.382 791.624 528.757 793.938 529.125C794.937 529.292 795.936 529.46 796.965 529.633C800.057 530.086 800.057 530.086 803.418 529.879C807.532 530.018 810.645 531.251 814.375 532.812C822.745 536.063 830.982 537.049 839.871 537.956C862.451 540.319 862.451 540.319 868 546C868.531 548.34 868.531 548.34 868.5 550.937L868.531 553.527C867.811 556.879 866.714 557.915 864 560C861.373 560.338 859.18 560.446 856.566 560.355C855.851 560.347 855.137 560.339 854.4 560.331C852.12 560.302 849.842 560.246 847.562 560.187C845.287 560.145 843.012 560.108 840.736 560.076C839.322 560.054 837.909 560.026 836.495 559.989C833.89 559.937 831.453 559.895 828.906 560.487C824.605 561.246 820.336 561.209 815.976 561.264C814.953 561.28 813.93 561.296 812.876 561.313C809.425 561.367 805.975 561.414 802.524 561.462C800.033 561.499 797.542 561.537 795.052 561.576C789.623 561.658 784.195 561.738 778.767 561.816C770.692 561.93 762.617 562.051 754.543 562.172C740.107 562.388 725.671 562.6 711.236 562.809C698.569 562.992 685.902 563.177 673.235 563.364C671.974 563.383 671.974 563.383 670.687 563.402C667.273 563.452 663.858 563.503 660.444 563.553C628.367 564.027 596.29 564.495 564.213 564.96C535.834 565.372 507.456 565.789 479.078 566.21C447.14 566.683 415.203 567.153 383.265 567.619C379.84 567.669 376.415 567.719 372.991 567.769C372.147 567.781 371.304 567.794 370.436 567.806C357.827 567.99 345.219 568.177 332.61 568.364C318.199 568.578 303.788 568.788 289.377 568.995C282.05 569.1 274.724 569.207 267.397 569.317C249.265 569.59 231.133 569.826 213 570C211.624 570.014 210.249 570.027 208.873 570.041C200.531 570.122 192.19 570.183 183.847 570.218C181.227 570.231 178.607 570.249 175.987 570.273C172.386 570.303 168.785 570.315 165.184 570.321C164.119 570.334 163.054 570.347 161.957 570.36C152.553 570.338 152.553 570.338 149 567C148.688 563.312 148.688 563.312 149 560H151V558C152.644 556.638 154.315 555.31 156 554C157.682 552.349 159.346 550.68 161 549C173.885 535.955 173.885 535.955 180.109 530.672C183.145 527.987 185.94 525.067 188.785 522.183C190.777 520.22 192.813 518.379 194.938 516.562C199.025 513.06 202.762 509.253 206.543 505.426C209.341 502.664 212.256 500.088 215.246 497.539C216.874 496.11 218.378 494.625 219.875 493.062C222 491 222 491 224 491L224.562 489C228.467 480.852 236.377 474.6 242.75 468.375C249.563 461.65 255.796 454.859 261.531 447.207C264.182 443.689 267.084 440.43 270.062 437.187C270.529 436.677 270.995 436.166 271.475 435.641C275.628 431.171 277.836 430.567 284 431Z"
      fill="black"
    />
  </svg>
);

export default arrow;
