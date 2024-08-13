import { SVGProps } from "react";
import * as React from "react";

const lava = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path d="M0 0h1024v1024H0V0z" fill="white" opacity="0" />
    <path d="M0 0H1024V1024H0V0Z" fill="white" opacity="0" />
    <path
      d="M0.120117 0.462646H1024.12V1024.46H0.120117V0.462646Z"
      fill="white"
      opacity="0"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M502.683 190.838C502.832 189.047 502.979 187.255 503.12 185.463C501.33 185.463 500.608 185.463 499.935 185.645C499.48 185.767 499.048 185.973 498.323 186.318C487.993 193.363 484.194 206.022 480.76 217.502C480.339 218.909 479.913 220.315 479.483 221.719C478.542 224.768 477.605 227.817 476.679 230.87C475.208 235.735 473.729 240.598 472.239 245.457L471.842 246.75C470.425 251.365 469.008 255.98 467.597 260.597C464.042 272.236 460.447 283.862 456.791 295.47L456.05 297.822C453.931 304.55 451.812 311.277 449.686 318.002C448.592 321.463 447.498 324.924 446.409 328.387C446.006 329.67 445.602 330.953 445.198 332.236C443.124 338.775 441.123 345.287 439.498 351.954C438.615 355.748 437.495 359.241 435.995 362.838C434.873 365.496 434.097 367.601 433.62 370.463C433.414 372.033 433.318 372.761 433.121 373.46C432.951 374.064 432.706 374.647 432.249 375.732C432.084 376.126 431.918 376.519 431.752 376.911C430.525 379.814 429.314 382.679 428.554 385.756C427.751 389.844 426.779 393.539 425.183 397.4C424.185 399.691 423.271 401.973 422.533 404.362C420.376 411.699 418.095 418.997 415.812 426.296C415.567 427.079 415.322 427.863 415.077 428.646L414.358 430.948C411.651 439.612 408.941 448.275 406.23 456.937L403.677 465.092L401.96 470.58C398.355 482.099 394.756 493.619 391.185 505.148C389.478 510.662 387.767 516.176 386.053 521.688C384.688 526.078 383.324 530.469 381.971 534.864C381.124 537.615 380.273 540.366 379.416 543.114C379.019 544.388 378.622 545.661 378.226 546.936C378.027 547.586 377.831 548.236 377.635 548.885C376.111 553.938 374.605 558.934 371.936 563.536C371.041 564.978 370.587 565.71 370.218 566.482C369.838 567.277 369.548 568.114 368.96 569.814C368.802 570.389 368.648 570.961 368.495 571.53C367.515 575.176 366.569 578.696 364.628 582.01C363.889 583.212 363.512 583.825 363.191 584.466C362.857 585.133 362.582 585.83 362.022 587.252L361.898 587.618C361.004 590.247 360.112 592.868 359.12 595.463C356.377 599.578 355.143 603.636 353.745 608.338C353.624 608.757 353.506 609.173 353.389 609.586C352.488 612.766 351.637 615.773 349.608 618.482C349.042 619.236 348.646 619.763 348.314 620.328C347.536 621.65 347.109 623.177 345.683 628.275C344.52 632.445 343.364 636.256 341.116 639.979C339.278 643.017 338.184 645.975 337.187 649.375C337.027 649.945 336.87 650.517 336.714 651.088C335.754 654.584 334.796 658.078 333.201 661.346C330.197 667.011 328.324 672.763 326.495 678.9L325.589 681.945L324.706 684.834C324.322 686.206 324.145 686.838 323.927 687.456C323.74 687.984 323.523 688.502 323.12 689.463L321.12 690.463L320.574 692.261C320.027 694.496 319.754 695.614 319.444 696.722C319.134 697.831 318.788 698.93 318.095 701.129L317.308 703.65L317.174 704.089C315.975 708.018 314.782 711.927 313.154 715.705C310.521 721.436 308.466 727.202 306.558 733.213C306.404 733.698 306.253 734.183 306.101 734.666C304.849 738.669 303.627 742.576 301.526 746.252C300.86 747.299 300.51 747.851 300.216 748.431C299.89 749.075 299.633 749.755 299.093 751.189C297.491 756.29 295.819 761.335 293.933 766.338C292.513 770.037 291.686 773.538 291.12 777.463C292.984 777.563 294.847 777.663 296.71 777.77L298.995 777.9C301.712 778.044 304.408 778.231 307.12 778.463C307.953 778.879 308.439 779.122 308.953 779.264C309.673 779.463 310.448 779.463 312.308 779.463C314.969 779.428 317.578 779.492 320.236 779.662C329.424 780.349 338.597 780.731 347.807 780.966L350.183 781.025C367.039 781.459 383.858 781.777 400.714 781.152L403.87 781.025L406.889 780.907L409.667 780.779C411.154 780.712 412.64 780.616 414.12 780.463C415.849 779.883 416.725 779.588 417.626 779.46C418.552 779.329 419.503 779.373 421.433 779.463C424.253 779.524 426.796 779.525 429.569 778.994C430.806 778.713 431.46 778.564 432.121 778.463C432.864 778.349 433.616 778.295 435.214 778.182L438.62 777.963L442.343 777.713C443.187 777.657 444.031 777.602 444.876 777.548C450.952 777.155 457.028 776.762 463.058 775.9L466.12 775.463H472.12C474.812 774.566 476.947 774.218 479.745 773.963C481.207 773.83 482.667 773.671 484.12 773.463C484.571 772.909 484.82 772.604 485.141 772.452C485.534 772.265 486.035 772.307 487.151 772.4C487.388 772.406 487.625 772.413 487.861 772.419C489.95 772.473 492.028 772.527 494.12 772.463L495.12 771.463C495.6 771.463 496.075 771.468 496.547 771.474C498.744 771.499 500.871 771.523 503.049 770.996C504.082 770.71 504.597 770.567 505.12 770.463C505.641 770.359 506.17 770.295 507.227 770.166L509.448 769.928L511.87 769.664L514.37 769.4C516.021 769.222 517.672 769.043 519.323 768.865L523.12 768.463V766.463L532.12 767.463V765.463H539.12V763.463L548.12 764.463V763.463C550.264 762.892 552.386 762.416 554.573 762.033C559.935 761.179 565.287 760.274 570.629 759.3L572.808 758.9C575.259 758.461 577.685 757.987 580.12 757.463C580.561 756.948 580.828 756.635 581.162 756.432C581.677 756.118 582.35 756.064 584.062 755.928L587.683 755.4L591.312 754.865L594.12 754.463V752.463C597.569 752.627 600.163 752.45 603.495 751.463L606.12 750.463V753.463L606.429 753.475C609.661 753.603 612.433 753.713 615.526 752.588L618.12 751.463L628.12 747.463V745.463L631.12 744.463C631.38 742.12 631.72 739.786 632.12 737.463L634.12 735.463C634.361 733.375 634.528 731.929 634.505 730.485C634.452 727.233 633.434 723.996 630.12 713.463L620.12 714.463L619.12 712.463L617.12 711.463L618.12 709.463L616.12 708.463L615.12 705.463L613.12 704.463V701.463H611.12C610.424 698.121 609.241 695.001 607.997 691.828L607.183 689.775C606.227 687.29 605.224 684.89 604.12 682.463L602.12 681.463C602.12 679.705 602.12 678.977 601.941 678.296C601.814 677.816 601.598 677.359 601.229 676.579C600.655 675.537 600.365 675.01 600.12 674.463C599.87 673.904 599.666 673.324 599.254 672.151L598.386 669.604L597.404 666.745C594.885 659.357 592.358 651.98 589.568 644.689C587.659 639.726 585.85 634.801 584.495 629.65C583.084 624.147 581.48 618.641 579.12 613.463L577.12 612.463L576.62 609.9C575.932 605.166 574.942 600.546 573.183 596.088C572.194 593.645 571.429 591.239 570.683 588.713C569.947 586.206 569.204 583.711 568.366 581.236C566.872 576.933 565.635 572.642 564.558 568.213C563.88 565.317 563.178 562.61 562.085 559.842C561.604 558.735 561.331 558.105 561.117 557.456C560.836 556.601 560.658 555.711 560.245 553.65C559.896 552.001 559.655 550.861 559.4 549.724C558.83 547.18 558.192 544.652 556.128 536.467C555.791 535.132 555.455 533.798 555.12 532.463C553.53 525.975 551.886 519.541 549.94 513.15C549.805 512.708 549.67 512.266 549.535 511.824C547.365 504.728 545.212 497.69 544.058 490.338C543.442 486.215 542.609 482.247 541.558 478.213C540.833 475.457 540.165 472.79 539.776 469.967C539.593 468.128 539.362 466.295 539.12 464.463L537.12 463.463C537.12 460.007 536.731 456.956 536.104 453.573C535.035 447.903 534.009 442.277 533.495 436.525C533.397 435.169 533.28 433.813 533.12 432.463C532.481 430.741 532.16 429.876 531.948 428.986C531.734 428.089 531.631 427.165 531.423 425.31C530.866 420.447 530.284 415.592 529.581 410.748C528.893 406.186 528.217 401.653 527.843 397.053C527.504 391.973 527.134 387.071 526.058 382.088C525.405 379.143 525.008 376.48 525.058 373.463L525.12 370.463C524.496 369.475 524.187 368.986 524.12 368.465C524.055 367.953 524.223 367.412 524.558 366.338L525.12 364.463H523.12C523.58 363.544 523.828 363.047 523.923 362.522C524.034 361.906 523.933 361.251 523.714 359.826C523.175 356.773 522.901 353.796 522.728 350.704C522.428 344.971 522.059 339.262 521.378 333.561C521.182 331.965 520.99 330.368 520.8 328.771L520.495 326.025C520.329 324.737 520.252 324.135 520.206 323.53C520.166 322.998 520.15 322.465 520.12 321.463L521.12 319.463L519.12 318.463L520.12 316.463L518.12 315.463C518.471 314.762 518.71 314.283 518.855 313.776C519.168 312.68 519.036 311.457 518.62 307.588C518.593 307.335 518.565 307.086 518.538 306.839C518.251 304.261 517.997 301.981 518.612 299.389C518.843 298.514 518.969 298.037 519.029 297.551C519.102 296.968 519.081 296.372 519.034 295.061L518.745 292.525C518.562 290.835 518.354 289.147 518.12 287.463C517.244 283.23 516.703 279.053 516.272 274.754L515.995 271.9L515.694 269.035L515.425 266.271C515.17 263.724 515.046 261.781 515.626 259.284C515.867 258.397 515.99 257.942 516.007 257.483C516.025 257 515.924 256.512 515.718 255.51C515.399 254.51 515.234 253.992 515.12 253.462C514.998 252.893 514.935 252.311 514.804 251.104L514.558 248.713L514.304 246.291L514.12 244.463H512.12C513.292 237.69 513.101 231.272 512.12 224.463C511.584 224.018 511.263 223.751 511.085 223.41C510.82 222.898 510.878 222.219 511.022 220.521L511.058 216.9L511.085 213.271L511.12 210.463L506.12 212.463C504.825 209.008 503.943 205.739 503.495 202.088L503.12 198.463H501.12C501.582 197.54 501.83 197.043 501.995 196.519C502.188 195.909 502.266 195.262 502.437 193.861L502.683 190.838ZM482.12 345.463H481.12C480.95 346.381 480.861 346.863 480.745 347.338C480.617 347.862 480.457 348.378 480.12 349.463C479.163 350.42 478.664 350.919 478.283 351.496C477.868 352.125 477.594 352.847 477.02 354.354L475.813 358.1C475.355 359.512 474.896 360.924 474.438 362.336C473.698 364.647 472.957 366.958 472.208 369.266C470.337 375.017 468.476 380.77 466.62 386.525C465.018 391.496 463.415 396.467 461.8 401.433C461.039 403.772 460.28 406.112 459.53 408.455C459.056 409.936 458.578 411.416 458.098 412.896L457.427 414.955C456.721 417.146 455.971 419.325 455.12 421.463L453.12 422.463C452.442 424.274 451.778 426.092 451.192 427.935L450.476 430.268C449.686 432.758 448.897 435.249 448.117 437.742C447.598 439.406 447.09 441.075 446.582 442.746C444.243 450.43 441.897 458.138 438.483 465.408C437.25 467.947 436.126 470.447 435.17 473.104L434.25 475.93L433.203 479.128C432.49 481.324 431.774 483.519 431.055 485.712C430.318 487.961 429.582 490.21 428.847 492.46C428.29 494.168 427.732 495.877 427.174 497.585L426.439 499.833L425.941 501.358C424.593 505.481 423.246 509.603 421.901 513.726C421.034 516.383 420.168 519.039 419.3 521.695L417.429 527.416C417.142 528.296 416.857 529.177 416.572 530.057C415.176 534.367 413.78 538.677 412.21 542.926C411.048 545.964 410.062 548.759 409.433 551.963L409.12 554.463H407.12C404.822 561.681 402.518 568.897 400.206 576.111L399.937 576.951C398.845 580.357 397.752 583.764 396.666 587.173C395.519 590.777 394.37 594.382 393.214 597.983C392.771 599.362 392.328 600.74 391.886 602.119C391.663 602.821 391.443 603.522 391.222 604.224C389.388 610.058 387.562 615.867 384.822 621.359L383.12 624.463L385.12 625.463C381.847 627.645 381.391 628.874 380.206 632.49L379.562 634.561C378.84 636.778 378.12 638.996 377.414 641.219C376.458 644.233 375.492 647.244 374.52 650.253L373.812 652.436C372.394 656.81 370.942 661.117 369.015 665.299C367.074 669.423 365.642 673.645 364.229 677.976C360.517 689.484 356.636 700.908 352.038 712.096C349.973 717.082 348.257 722.114 346.683 727.275C344.73 733.698 342.502 739.934 340.038 746.182L339.12 748.463C348.888 749.781 358.55 750.592 368.414 750.652L371.87 750.65L372.301 750.651C377.538 750.654 382.686 750.658 387.886 749.951C389.453 749.678 390.284 749.533 391.122 749.463C392.068 749.383 393.022 749.397 395.054 749.428C398.417 749.472 401.749 749.36 405.108 749.158L407.183 749.025C408.667 748.933 410.151 748.841 411.636 748.748C413.856 748.606 416.077 748.465 418.298 748.333C419.688 748.252 421.078 748.169 422.468 748.084L424.433 747.963C426.664 747.828 428.894 747.667 431.12 747.463C433.401 746.886 435.227 746.46 437.593 746.4L438.049 746.411C440.41 746.469 442.757 746.526 445.12 746.463L448.12 745.463L448.666 745.463C451.451 745.465 454.096 745.467 456.87 745.025C460.618 744.377 464.359 744.009 468.144 743.646L470.12 743.463V741.463C476.221 741.575 482.09 741.45 488.12 740.463C488.571 739.909 488.82 739.604 489.141 739.452C489.534 739.265 490.035 739.307 491.151 739.4C491.388 739.406 491.625 739.413 491.861 739.419C493.95 739.473 496.028 739.527 498.12 739.463C503.333 737.48 506.022 736.457 508.804 735.883C511.769 735.272 514.84 735.171 521.183 734.963L524.345 734.607L527.343 734.244C528.868 734.069 529.536 733.993 530.195 733.876C530.708 733.785 531.217 733.669 532.12 733.463L533.12 731.463C536.788 731.613 539.822 731.547 543.37 730.545C546.581 729.619 549.731 728.94 553.021 728.372C559.325 727.299 565.236 726.037 571.12 723.463C568.767 716.083 566.143 708.844 562.894 701.807C560.759 697.249 558.806 692.751 557.245 687.963C555.788 683.415 554.21 678.931 552.548 674.454C549.587 666.505 546.666 658.557 544.12 650.463C544.009 650.074 543.898 649.684 543.787 649.295C542.973 646.435 542.16 643.583 541.218 640.76C539.53 635.793 537.909 630.845 536.558 625.775C535.902 623.299 535.245 620.842 534.444 618.408C531.762 609.866 530.421 605.594 529.193 601.29C527.965 596.983 526.85 592.644 524.62 583.963C522.22 574.768 519.689 565.612 517.12 556.463H515.12C516.442 552.277 515.829 549.079 514.884 544.918L514.308 542.525C513.361 538.361 512.39 534.271 511.038 530.217C510.538 528.819 510.299 528.149 510.12 527.464C509.956 526.833 509.844 526.19 509.628 524.955C508.81 519.366 507.819 513.826 506.705 508.289C504.41 496.972 502.231 485.64 500.183 474.275C499.704 471.61 499.215 468.947 498.694 466.29C496.423 454.792 494.42 443.31 492.835 431.697C492.483 429.097 492.125 426.499 491.75 423.902C490.208 413.437 488.793 402.97 487.558 392.463C486.792 385.899 485.997 379.36 484.933 372.838C484.618 371.053 484.346 369.261 484.12 367.463C484.136 363.073 484.01 358.871 483.409 354.516L483.12 352.525C482.792 350.17 482.459 347.816 482.12 345.463Z"
      fill="black"
    />
  </svg>
);

export default lava;
