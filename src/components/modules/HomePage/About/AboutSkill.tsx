"use client"
import React, { useEffect, useState, memo } from 'react';
import Image from 'next/image';
import { Skill } from '@/lib/api';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'tailwind' | 'typescript' | 'nextjs' | 'express' | 'mongodb' | 'postgresql' | 'python' | 'java' | 'php' | 'laravel' | 'vue' | 'angular' | 'sass' | 'bootstrap' | 'git' | 'docker' | 'aws' | 'default';

type GlowColor = 'cyan' | 'purple';

// Props interface for AboutSkill component
interface AboutSkillProps {
  skills?: Skill[];
}

interface SkillIconProps {
  type: IconType;
  logoUrl?: string;
  skillName?: string;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  logoUrl?: string;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
  level?: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#3178C6"/>
        <path d="M1.5 63.91V12.09h35.88v51.82H1.5zM20.4 46.79c.41-.2.61-.32.61-.32V34.16h-5.18v14.64h2.97V46.7c.46 0 .59-.03.59-.03v-1.88z" fill="white"/>
      </svg>
    ),
    color: '#3178C6'
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3218-6.4718 2.1681-8.77 5.1681C.4133 7.7896.0007 10.8446.0007 12.0006c0 1.1547.4126 4.2097 2.4488 6.7334 2.2982 2.9997 5.3612 4.8458 8.77 5.1681.1477.0118.312.0275.3636.0328.0486.0054.1821.0067.3584.0067.1763 0 .3098-.0013.3584-.0067.0516-.0053.2159-.021.3636-.0328 3.4088-.3218 6.4718-2.1681 8.77-5.1681C23.5867 16.2103 23.9993 13.1553 23.9993 11.9993c0-1.1547-.4126-4.2097-2.4488-6.7334C19.5523 2.2662 16.4893.42 13.0805.0972c-.1477-.0118-.312-.0275-.3636-.0328C12.6679.0013 12.5344 0 12.358 0h-.7855zM23.6597 17.073c-1.184 1.505-2.744 2.726-4.504 3.532-.2892.1326-.5756.2503-.8668.3491-.2904.0985-.5834.1858-.8819.2615-.2985.0757-.5997.1398-.9048.1913-.3051.0515-.6128.0903-.9226.1154-.3098.0251-.6221.0365-.9366.0365-.3145 0-.6268-.0114-.9366-.0365-.3098-.0251-.6175-.0639-.9226-.1154-.3051-.0515-.6063-.1156-.9048-.1913-.2985-.0757-.5915-.163-.8819-.2615-.2912-.0988-.5776-.2165-.8668-.3491-1.76-.806-3.32-2.027-4.504-3.532C.1885 15.4132-.2033 13.4983-.2033 11.9993c0-3.2577 1.3162-6.2098 3.4446-8.3382C5.3697 1.5327 8.3218.2165 11.5795.2165c3.2577 0 6.2098 1.3162 8.3382 3.4446 2.1284 2.1284 3.4446 5.0805 3.4446 8.3382 0 1.499-.3918 3.4139-2.0026 5.0407z" fill="#000000"/>
      </svg>
    ),
    color: '#000000'
  },
  express: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" fill="#68A063"/>
      </svg>
    ),
    color: '#68A063'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" fill="#47A248"/>
      </svg>
    ),
    color: '#47A248'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.111 5.498c-.353-2.977-2.312-4.545-4.845-4.545-1.29 0-2.513.514-3.355 1.411-.843-.897-2.065-1.411-3.355-1.411-2.533 0-4.492 1.568-4.845 4.545C6.357 6.851 6 8.463 6 10.136c0 4.418 3.582 8 8 8s8-3.582 8-8c0-1.673-.357-3.285-.711-4.638z" fill="#336791"/>
      </svg>
    ),
    color: '#336791'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.25.04.16.02.08v13.54a29.75 29.75 0 0 0-.07-2.17l-.06-.65-.05-.51-.04-.45-.04-.34-.03-.24-.03-.16v-.1L16.27 16c-.45.1-1.04.2-1.77.33l-.73.13-.71.13-.45.1c-.06.01-.1.03-.14.05L9.6 17.25l-.55.13-.6.15-.49.14-.61.19-.58.22-.46.2-.3.14-.14.09.04-.09.07-.2.1-.32.1-.46.1-.59.1-.71.1-.83.1-.94v-.94l-.05-.98-.08-1.01-.11-1.03-.13-1.04-.14-1.04-.15-1.03-.15-1.02-.15-1-.15-.98-.14-.95-.13-.9-.11-.87-.09-.82-.07-.76-.05-.7-.03-.63-.01-.56v-.48l.02-.4.04-.32.07-.24.09-.17.12-.1.15-.04.19.03.23.09.27.16.31.24.36.32.42.42.48.52.55.64.62.77.7.91.78 1.07.87 1.23.97 1.4 1.07 1.57 1.18 1.74 1.29 1.92 1.4 2.1 1.51 2.28 1.63 2.47 1.75 2.65 1.87 2.84 1.99 3.02 2.11 3.21h.01l.12-.37.06-.75.02-1.12-.03-1.5-.07-1.87-.12-2.25-.16-2.62-.21-3-.25-3.37-.29-3.75-.33-4.12-.37-4.5-.4-4.87-.44-5.25-.48-5.62-.52-6-.55-6.37-.59-6.75-.63-7.12-.66-7.5-.7-7.87L14.25.18z" fill="#FFD43B"/>
      </svg>
    ),
    color: '#FFD43B'
  },
  java: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#ED8B00"/>
      </svg>
    ),
    color: '#ED8B00'
  },
  php: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.384.32-.27.48-.649.48-1.155 0-.356-.09-.625-.267-.808-.177-.184-.462-.301-.884-.301zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12s-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.549 1.004.549 1.757 0 .656-.174 1.295-.545 1.545zm7.415-3.708h-1.378l-.327 1.682h1.378c.797 0 1.288.209 1.473.628.185.418.277 1.004.277 1.757 0 .656-.092 1.295-.277 1.545-.185.25-.676.438-1.473.551h-1.378l-.327 1.681h-1.378l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.549 1.004.549 1.757 0 .656-.174 1.295-.545 1.545z" fill="#777BB4"/>
      </svg>
    ),
    color: '#777BB4'
  },
  laravel: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.02c-.01.003-.018.007-.027.007-.013 0-.027-.004-.04-.007l-.014-.006-.018-.004-.018-.008-.01-.004-.013-.006-.016-.008-.024-.014-.01-.008-.022-.016-.025-.02-.01-.012-.011-.007-.011-.011-.02-.018-.024-.02-.01-.012-.04-.046-.01-.01-.014-.016-.074-.104-4.365-2.517a.377.377 0 01-.187-.324v-4.934L.254 15.856a.377.377 0 01-.189-.326V10.38c0-.042.003-.084.011-.123.003-.01.009-.02.013-.03.007-.02.018-.037.03-.054.008-.013.019-.025.030-.036.005-.005.009-.011.013-.015l4.976-2.888a.294.294 0 01.188 0l4.976 2.888c.004.004.008.01.013.015a.117.117 0 01.03.036c.012.017.023.035.030.054.005.01.010.020.013.030.008.039.011.081.011.123v4.257l3.788-2.191v-4.934a.378.378 0 01.188-.326L9.93.051c.008-.004.018-.006.027-.009.01-.002.02-.004.030-.005.013-.002.025-.004.038-.004s.025.002.038.004c.010.001.020.003.030.005.009.003.018.005.027.009l9.043 5.194a.378.378 0 01.188.326z" fill="#FF2D20"/>
      </svg>
    ),
    color: '#FF2D20'
  },
  vue: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" fill="#4FC08D"/>
      </svg>
    ),
    color: '#4FC08D'
  },
  angular: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M9.93 12.645h4.134L12 9.031l-2.07 3.614z" fill="white"/>
        <path d="M12 2.118l9.836 3.515-1.506 13.141L12 22.887l-8.33-4.113L2.164 5.633L12 2.118zM12 5.863L8.1 15.568h1.618l.95-2.235h4.662l.95 2.235H17.9L12 5.863z" fill="#DD0031"/>
      </svg>
    ),
    color: '#DD0031'
  },
  sass: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z" fill="#CF649A"/>
      </svg>
    ),
    color: '#CF649A'
  },
  bootstrap: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572z" fill="#563D7C"/>
      </svg>
    ),
    color: '#563D7C'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F34F29"/>
      </svg>
    ),
    color: '#F34F29'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186H5.136a.186.186 0 00-.186.186v1.887a.186.186 0 00.186.185M2.171 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H2.171a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185" fill="#0DB7ED"/>
      </svg>
    ),
    color: '#0DB7ED'
  },
  aws: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.143.239l-.479.32c-.068.047-.136.063-.2.063-.08 0-.16-.04-.239-.112-.112-.12-.207-.248-.28-.383-.072-.135-.144-.295-.2-.495C5.671 10.588 5.336 10.036 4.95 9.62c-.385-.416-.926-.624-1.625-.624-.464 0-.836.08-1.119.255-.287.176-.424.432-.424.784 0 .248.064.464.2.624.135.16.34.297.608.424.267.112.58.207.935.296.36.088.735.18 1.127.279v.616c0 .68-.144 1.151-.424 1.423-.287.271-.735.407-1.359.407-.263 0-.535-.032-.807-.08-.271-.063-.535-.144-.791-.263-.12-.064-.207-.104-.247-.151-.04-.048-.063-.112-.063-.2v-.495c0-.112.016-.2.056-.239.04-.048.104-.063.2-.016.239.112.487.2.751.255.27.056.536.08.808.08.6 0 1.04-.112 1.319-.344.287-.231.424-.616.424-1.15v-.208c-.424.191-.87.287-1.343.287-.96 0-1.687-.272-2.174-.823-.488-.552-.727-1.29-.727-2.222 0-.728.255-1.335.767-1.807.51-.47 1.184-.712 2.022-.712.68 0 1.335.111 1.959.336.624.224 1.215.56 1.767.999v-.895c0-.192.04-.336.119-.41.08-.08.207-.119.384-.119h.616c.135 0 .255.04.336.119.08.08.12.223.12.41v4.718zm-3.262-2.7c0 .823-.216 1.215-.647 1.215-.319 0-.647-.216-.935-.647-.287-.432-.432-.968-.432-1.608 0-.735.2-1.255.6-1.575.4-.319.823-.479 1.279-.479.319 0 .647.048.999.144.351.095.631.223.831.375v2.575zm6.43 6.852c-.184 0-.31-.032-.375-.104-.064-.071-.12-.2-.168-.375L6.74 4.167c-.047-.16-.071-.263-.071-.32 0-.128.064-.2.191-.2h.783c.192 0 .32.033.376.105.063.071.111.199.159.374l2.997 11.78c.048.192.096.32.144.375.047.056.127.08.231.08h.537c.103 0 .184-.023.231-.08.048-.055.103-.183.151-.374l3.052-11.78c.048-.16.096-.288.144-.375.047-.08.184-.104.375-.104h.641c.192 0 .32.032.376.104.063.072.111.2.159.375l3.84 11.893c.047.144.095.271.143.375.048.104.128.16.24.16h.743c.128 0 .192-.08.192-.24 0-.048-.008-.104-.024-.16L16.776.295c-.047-.16-.103-.287-.168-.375C16.544.04 16.41.007 16.234.007h-.68c-.103 0-.184.023-.231.08-.048.055-.103.183-.151.374L12.015 12.13 8.859.46c-.047-.16-.103-.288-.151-.374-.048-.08-.128-.104-.232-.104z" fill="#FF9900"/>
      </svg>
    ),
    color: '#FF9900'
  },
  default: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="10" fill="#6B7280"/>
        <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white">?</text>
      </svg>
    ),
    color: '#6B7280'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type, logoUrl, skillName }: SkillIconProps) => {
  // If we have a logo URL from the API, use it instead of the hardcoded SVG
  if (logoUrl) {
    return (
      <div className="w-full h-full relative">
        <Image 
          src={logoUrl} 
          alt={skillName || 'Skill'} 
          fill
          className="object-contain"
          sizes="(max-width: 768px) 40px, 50px"
          onError={() => {
            // Note: Next.js Image component handles errors differently
            // We'll handle fallback in the parent component if needed
          }}
        />
      </div>
    );
  }
  
  // Fallback to hardcoded SVG icons
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// Function to map skill names to icon types
const getIconTypeFromSkillName = (skillName: string): IconType => {
  const name = skillName.toLowerCase();
  
  // Frontend skills mapping
  if (name.includes('html')) return 'html';
  if (name.includes('css')) return 'css';
  if (name.includes('javascript') || name.includes('js')) return 'javascript';
  if (name.includes('typescript') || name.includes('ts')) return 'typescript';
  if (name.includes('react')) return 'react';
  if (name.includes('next') || name.includes('nextjs')) return 'nextjs';
  if (name.includes('tailwind')) return 'tailwind';
  if (name.includes('sass') || name.includes('scss')) return 'sass';
  if (name.includes('bootstrap')) return 'bootstrap';
  if (name.includes('vue')) return 'vue';
  if (name.includes('angular')) return 'angular';
  
  // Backend skills mapping
  if (name.includes('node') || name.includes('nodejs')) return 'node';
  if (name.includes('express')) return 'express';
  if (name.includes('mongo') || name.includes('mongodb')) return 'mongodb';
  if (name.includes('postgresql') || name.includes('postgres')) return 'postgresql';
  if (name.includes('python')) return 'python';
  if (name.includes('java')) return 'java';
  if (name.includes('php')) return 'php';
  if (name.includes('laravel')) return 'laravel';
  if (name.includes('git')) return 'git';
  if (name.includes('docker')) return 'docker';
  if (name.includes('aws')) return 'aws';
  
  return 'default';
};

// Function to create skills configuration from API data
const createSkillsConfig = (apiSkills: Skill[]): SkillConfig[] => {
  if (!apiSkills || apiSkills.length === 0) {
    // Fallback configuration
    return [
      { 
        id: 'html',
        orbitRadius: 100, 
        size: 40, 
        speed: 1, 
        iconType: 'html', 
        phaseShift: 0, 
        glowColor: 'cyan',
        label: 'HTML5'
      },
      { 
        id: 'css',
        orbitRadius: 100, 
        size: 45, 
        speed: 1, 
        iconType: 'css', 
        phaseShift: (2 * Math.PI) / 3, 
        glowColor: 'cyan',
        label: 'CSS3'
      },
      { 
        id: 'javascript',
        orbitRadius: 100, 
        size: 40, 
        speed: 1, 
        iconType: 'javascript', 
        phaseShift: (4 * Math.PI) / 3, 
        glowColor: 'cyan',
        label: 'JavaScript'
      },
      { 
        id: 'react',
        orbitRadius: 180, 
        size: 50, 
        speed: -0.6, 
        iconType: 'react', 
        phaseShift: 0, 
        glowColor: 'purple',
        label: 'React'
      },
      { 
        id: 'node',
        orbitRadius: 180, 
        size: 45, 
        speed: -0.6, 
        iconType: 'node', 
        phaseShift: (2 * Math.PI) / 3, 
        glowColor: 'purple',
        label: 'Node.js'
      },
      { 
        id: 'tailwind',
        orbitRadius: 180, 
        size: 40, 
        speed: -0.6, 
        iconType: 'tailwind', 
        phaseShift: (4 * Math.PI) / 3, 
        glowColor: 'purple',
        label: 'Tailwind CSS'
      },
    ];
  }

  // Filter for Frontend and Backend Development skills only
  const filteredSkills = apiSkills.filter(skill => 
    skill.category.title === 'Frontend Development' || 
    skill.category.title === 'Backend Development'
  );

  // Separate by category
  const frontendSkills = filteredSkills.filter(skill => skill.category.title === 'Frontend Development');
  const backendSkills = filteredSkills.filter(skill => skill.category.title === 'Backend Development');

  const skillConfigs: SkillConfig[] = [];

  // Create configurations for frontend skills (inner orbit)
  frontendSkills.forEach((skill, index) => {
    const totalFrontend = frontendSkills.length;
    const phaseShift = (2 * Math.PI * index) / totalFrontend;
    
    skillConfigs.push({
      id: skill._id,
      orbitRadius: 100,
      size: 40 + (index % 2) * 5, // Vary sizes slightly
      speed: 1,
      iconType: getIconTypeFromSkillName(skill.skill),
      logoUrl: skill.logo, // Add the API logo URL
      phaseShift,
      glowColor: 'cyan',
      label: skill.skill,
      level: skill.level // Add the skill level
    });
  });

  // Create configurations for backend skills (outer orbit)
  backendSkills.forEach((skill, index) => {
    const totalBackend = backendSkills.length;
    const phaseShift = (2 * Math.PI * index) / totalBackend;
    
    skillConfigs.push({
      id: skill._id,
      orbitRadius: 180,
      size: 45 + (index % 2) * 5, // Vary sizes slightly
      speed: -0.6,
      iconType: getIconTypeFromSkillName(skill.skill),
      logoUrl: skill.logo, // Add the API logo URL
      phaseShift,
      glowColor: 'purple',
      label: skill.skill,
      level: skill.level // Add the skill level
    });
  });

  return skillConfigs;
};

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { orbitRadius, size, iconType, logoUrl, label, level } = config;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate positions with consistent precision
  const x = Math.round(Math.cos(angle) * orbitRadius * 100) / 100;
  const y = Math.round(Math.sin(angle) * orbitRadius * 100) / 100;

  // Avoid hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div
        className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -50%)`,
          zIndex: '10',
        }}
      />
    );
  }

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? '20' : '10',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} logoUrl={logoUrl} skillName={label} />
        {isHovered && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap pointer-events-none z-30">
            <div className="font-semibold">{label}</div>
            {level && (
              <div className="text-xs text-gray-300 mt-1">Level: {level}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function AboutSkill({ skills = [] }: AboutSkillProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Create dynamic skills configuration from API data
  const skillsConfig = createSkillsConfig(skills);
  
  // Debug log to see what skills are being processed
  if (process.env.NODE_ENV === 'development') {
    console.log('AboutSkill received skills:', skills?.length, 'skills');
    console.log('Frontend skills:', skills?.filter(s => s.category.title === 'Frontend Development').length);
    console.log('Backend skills:', skills?.filter(s => s.category.title === 'Backend Development').length);
    console.log('Generated configs:', skillsConfig.length);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPaused || !isMounted) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isMounted]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <main className="w-full flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = isMounted ? time * config.speed + (config.phaseShift || 0) : config.phaseShift || 0;
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}