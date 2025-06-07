/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoCloseCircle, IoSearch } from "react-icons/io5";
// import ConnectButton from "../ConnectButton";
import { IoIosTrendingUp } from "react-icons/io";

import { TfiHelpAlt } from "react-icons/tfi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { usePathname } from "next/navigation";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuContent,
// } from "@/components/ui/navigation-menu"
import { HoverEffect } from "./HoverEffect";

import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const pathname:any = usePathname()
  const [searchModal,setSearchModal] = useState(false)
  const [profileModal,setProfileModal] = useState(false)
  const listRef:any = useRef(null);
  const {data:user}:any = useSession()
  const [searchValue,setSearchValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<any>({});

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`/api/admin/getCategories`);
      setCategories(data)
    }
    getCategories()
  }, []);

  // let categories:any[] = [
  //   {
  //     name: "Graphics & Design",
  //     categories:[
  //       {name: "Logo Design", href: "/logo-design", properties: [
  //         {propTitle:"Logo Style", 
  //          propStyle:["3D","Flat/Minimalist","Mascot/Character","Signature","Handwriting","Vintage/Retro","Corporate","Story"], 
  //          options:{differentDesigns:20,sourceFile:false,highDefinition:false,mockup3D:false,brandIdentitiy:false,socialMediaKit:false,vectorFile:false,logoIntro:false}, 
  //          extras:[{title:"Fast Delivery", status:false, basic:{basicDay:3,price:150}, standart:{standartDay:3,price:200}, premium:{premiumDay:3,price:250}},]
  //         }
  //       ]},
  //       {name: "Brand Style", href: "/brand-style"},
  //       {name: "Business Card & Stationery", href: "/business-card-stationery"},
  //       {name: "Fonts", href: "/fonts"},
  //       {name: "Illustration", href: "/illustration"},
  //       {name: "AI Artists", href: "/ai-artists"},
  //       {name: "Portraits & Caricatures", href: "/portraits-caricatures"},
  //       {name: "Cartoon & Comics", href: "/cartoon-comics"},
  //       {name: "Pattern Design", href: "/pattern-design"},
  //       {name: "Tattoo Design", href: "/tattoo-design"},
  //       {name: "Storyboards", href: "/storyboards"},
  //       {name: "NFT Art", href: "/nft-art"},
  //       {name: "Website Design", href: "/website-design"},
  //       {name: "App Design", href: "/app-design"},
  //       {name: "UX Design", href: "/ux-design"},
  //       {name: "Landing Page Design", href: "/landing-page-design"},
  //       {name: "Icon Design", href: "/icon-design"},
  //       {name: "Industrial & Product Design", href: "/industrial-product-design"},
  //       {name: "Character Modelling", href: "/character-modelling"},
  //       {name: "Game Art", href: "/game-art"},
  //       {name: "Graphics for Streamers", href: "/graphics-for-streamers"},
  //       {name: "Flyer Design", href: "/flyer-design"},
  //       {name: "Brochure Design", href: "/brochure-design"},
  //       {name: "Poster Design", href: "/poster-design"},
  //       {name: "Catalog Design", href: "/catalog-design"},
  //       {name: "Menu Design", href: "/menu-design"},
  //       {name: "Image Editing", href: "/image-editing"},
  //       {name: "Presentation Design", href: "/presentation-design"},
  //       {name: "Background Removal", href: "/background-removal"},
  //       {name: "Infographic Design", href: "/infographic-design"},
  //       {name: "Vector Tracing", href: "/vector-tracing"},
  //       {name: "Resume Design", href: "/resume-design"},
  //       {name: "Social Media Design", href: "/social-media-design"},
  //       {name: "Social Posts & Banners", href: "/social-posts-banners"},
  //       {name: "Email Design", href: "/email-design"},
  //       {name: "Web Banners", href: "/web-banners"},
  //       {name: "Signage Design", href: "/signage-design"},
  //       {name: "Packaging & Label Design", href: "/packaging-label-design"},
  //       {name: "Book Design", href: "/book-design"},
  //       {name: "Book Covers", href:"/book-covers"},
  //       {name: "Album Cover Design", href:"/album-cover-design"},
  //       {name: "Architecture & Interior Design", href:"/architecture-interior-design"},
  //       {name: "Landspace Design", href:"/landscape-design"},
  //       {name: "Building Engineering", href:"/building-engineering"},
  //       {name: "T-Shirts & Merchandise", href:"/t-shirts-merchandise"},
  //       {name: "Fashion Design", href:"/fashion-design"},
  //       {name: "Jewelry Design", href:"/jewelry-design"},
  //       {name: "3D Architecture", href:"/3d-architecture"},
  //       {name: "3D Industrial Design", href:"/3d-industrial-design"},
  //       {name: "3D Fashion & Garments", href:"/3d-fashion-garments"},
  //       {name: "3D Printing Characters", href:"/3d-printing-characters"},
  //       {name: "3D Landscape", href:"/3d-landscape"},
  //       {name: "3D Game Art", href:"/3d-game-art"},
  //       {name: "3D Jewelry Design", href:"/3d-jewelry-design"},
  //     ]
  //   },
  //   {
  //     name: "Programming & Tech",
  //     categories:[
  //       {name: "Business Websites",href:"/business-websites"},
  //       {name: "E-Commerce Development",href:"/e-commerce-development"},
  //       {name: "Landing Pages",href:"/landing-pages"},
  //       {name: "Dropshipping Websites",href:"/dropshipping-websites"},
  //       {name: "WordPress",href:"/wordpress"},
  //       {name: "Shopify",href:"/shopify"},
  //       {name: "Wix",href:"/wix"},
  //       {name: "Custom Websites",href:"/custom-websites"},
  //       {name: "GoDaddy",href:"/godaddy"},
  //       {name: "Website Customization",href:"/website-customization"},
  //       {name: "Bug Fixes",href:"/bug-fixes"},
  //       {name: "Backup & Migration",href:"/backup-migration"},
  //       {name: "Speed Optimization",href:"/speed-optimization"},
  //       {name: "AI Chatbot",href:"/ai-chatbot"},
  //       {name: "AI Applications",href:"/ai-applications"},
  //       {name: "AI Integrations",href:"/ai-integrations"},
  //       {name: "AI Agent",href:"/ai-agent"},
  //       {name: "AI Fine-Tunning",href:"/ai-fine-tunning"},
  //       {name: "Custom GPT Apps",href:"/custom-gpt-apps"},
  //       {name: "Discord",href:"/discord"},
  //       {name: "Telegram",href:"/telegram"},
  //       {name: "Botpress",href:"/botpress"},
  //       {name: "Tiktok",href:"/tiktok"},
  //       {name: "Facebook Messenger",href:"/facebook-messenger"},
  //       {name: "Gameplay Experience & Feedback",href:"/gameplay-experience-feedback"},
  //       {name: "PC Games",href:"/pc-games"},
  //       {name: "Mobile Games",href:"/mobile-games"},
  //       {name: "Console Games",href:"/console-games"},
  //       {name: "Cross-platform Development",href:"/cross-platform-development"},
  //       {name: "Android App Development",href:"/android-app-development"},
  //       {name: "IOS App Development",href:"/ios-app-development"},
  //       {name: "Website to App",href:"/website-to-app"},
  //       {name: "Mobile App Maintance",href:"/mobile-app-maintance"},
  //       {name: "Smartwatch Development",href:"/smartwatch-development"},
  //       {name: "VR Headset Development",href:"/vr-headset-development"},
  //       {name: "Support & IT",href:"/support-it"},
  //       {name: "Cloud Computing",href:"/cloud-computing"},
  //       {name: "DevOps Engineering",href:"/devops-engineering"},
  //       {name: "Cybersecurity",href:"/cybersecurity"},
  //       {name: "Convert Files",href:"/convert-files"},
  //       {name: "Web Applications",href:"/web-applications"},
  //       {name: "Desktop Applications",href:"/desktop-applications"},
  //       {name: "APIs & Integrations",href:"/apis-integrations"},
  //       {name: "Scripting",href:"/scripting"},
  //       {name: "Browser Extensions",href:"/browser-extensions"},
  //       {name: "QA & Review",href:"/qa-review"},
  //       {name: "User Testing",href:"/user-testing"},
  //       {name: "Decentralized Apps",href:"/decentralized-apps"},
  //       {name: "Cryptocurrencies & Tokens",href:"/cryptocurrencies-tokens"},
  //       {name: "Blockchain Protocol Development",href:"/blockchain-protocol-development"},
  //       {name: "Chain Analysis",href:"/chain-analysis"},
  //       {name: "Exchange Platforms",href:"/exchange-platforms"},
  //       {name: "Blockchain Security & Auditing",href:"/blockchain-security-auditing"},
  //       {name: "Electronics Engineering",href:"/electronics-engineering"},
  //       {name: "Development for Streamers",href:"/development-for-streamers"},
  //     ]
  //   },
  //   {
  //     name: "Digital Marketing",
  //     categories:[
  //       {name: "Search Engine Optimization (SEO)",href:"/search-engine-optimization-seo"},
  //       {name: "Search Engine Marketing (SEM)",href:"/search-engine-marketing-sem"},
  //       {name: "Local SEO",href:"/local-seo"},
  //       {name: "E-Commerce SEO",href:"/e-commerce-seo"},
  //       {name: "Video SEO",href:"/video-seo"},
  //       {name: "Social Media Marketing",href:"/social-media-marketing"},
  //       {name: "Paid Social Media",href:"/paid-social-media"},
  //       {name: "Social Commerce",href:"/social-commerce"},
  //       {name: "Influencer Marketing",href:"/influencer-marketing"},
  //       {name: "Community Management",href:"/community-management"},
  //       {name: "Video Marketing",href:"/video-marketing"},
  //       {name: "E-Commerce Marketing",href:"/e-commerce-marketing"},
  //       {name: "Email Marketing",href:"/email-marketing"},
  //       {name: "Email Automations",href:"/email-automations"},
  //       {name: "Guest Posting",href:"/guest-posting"},
  //       {name: "Affiliate Marketing",href:"/affiliate-marketing"},
  //       {name: "Display Advertising",href:"/display-advertising"},
  //       {name: "Public Relations",href:"/public-relations"},
  //       {name: "Text Message Marketing",href:"/text-message-marketing"},
  //       {name: "Marketing Strategy",href:"/marketing-strategy"},
  //       {name: "Marketing Concepts & Ideation",href:"/marketing-concepts-ideation"},
  //       {name: "Marketing Advice",href:"/marketing-advice"},
  //       {name: "Web Analytics",href:"/web-analytics"},
  //       {name: "Conversion Rate Optimization (CRO)",href:"/conversion-rate-optimization-cro"},
  //       {name: "Tiktok Shop",href:"/tiktok-shop"},
  //       {name: "Facebook Ads Campaign",href:"/facebook-ads-campaign"},
  //       {name: "Instagram Marketing",href:"/instagram-marketing"},
  //       {name: "Google SEM",href:"/google-sem"},
  //       {name: "Shopify Marketing",href:"/shopify-marketing"},
  //       {name: "Music Promotion",href:"/music-promotion"},
  //       {name: "Podcast Marketing",href:"/podcast-marketing"},
  //       {name: "Book & eBook Marketing",href:"/book-ebook-marketing"},
  //       {name: "Mobile App Marketing",href:"/mobile-app-marketing"},
  //       {name: "Crowdfunding",href:"/crowdfunding"},
  //     ]
  //   },
  //   {
  //     name: "Video & Animation",
  //     categories:[
  //       {name: "Video Editing", href:"/video-editing"},
  //       {name: "Visual Effects", href:"/visual-effects"},
  //       {name: "Visual Art", href:"/visual-art"},
  //       {name: "Intro & Outro Videos", href:"/intro-outro-videos"},
  //       {name: "Video Template Editing", href:"/video-template-editing"},
  //       {name: "Subtitles & Captions", href:"/subtitles-captions"},
  //       {name: "Video Ads & Commercials", href:"/video-ads-commercials"},
  //       {name: "Social Media Videos", href:"/social-media-videos"},
  //       {name: "UGC Videos", href:"/ugc-videos"},
  //       {name: "Music Videos", href:"/music-videos"},
  //       {name: "Slideshow Videos", href:"/slideshow"},
  //       {name: "Character Animation", href:"/character-animation"},
  //       {name: "Animated GIFs", href:"/animated-gifs"},
  //       {name: "Animation for Kids", href:"/animation-for-kids"},
  //       {name: "Animation for Streamers", href:"/animation-for-streamers"},
  //       {name: "Rigging", href:"/rigging"},
  //       {name: "NFT Animation", href:"/nft-animation"},
  //       {name: "Logo Animation", href:"/logo-animation"},
  //       {name: "Lottie & Web Animation", href:"/lottie-web-animation"},
  //       {name: "Text Animation", href:"/text-animation"},
  //       {name: "Videographers", href:"/videographers"},
  //       {name: "Filmed Video Production", href:"/filmed-video-production"},
  //       {name: "Animated Explainers", href:"/animated-explainers"},
  //       {name: "Live Action Explainers", href:"/live-action-explainers"},
  //       {name: "Spokesperson Videos", href:"/spokesperson-videos"},
  //       {name: "Screencasting Videos", href:"/screencasting-videos"},
  //       {name: "eLearning Video Production", href:"/elearning-video-production"},
  //       {name: "Crowdfunding Videos", href:"/crowdfunding-videos"},
  //       {name: "3D Product Animation", href:"/3d-product-animation"},
  //       {name: "E-Commerce Product Videos", href:"/e-commerce-product-videos"},
  //       {name: "Corporate Videos", href:"/corporate-videos"},
  //       {name: "App & Website Previews", href:"/app-website-previews"},
  //       {name: "AI Video Art", href:"/ai-video-art"},
  //       {name: "AI Music Videos", href:"/ai-music-videos"},
  //       {name: "AI Spokespersons Videos", href:"/ai-spokespersons-videos"},
  //       {name: "Article to Video", href:"/article-to-video"},
  //       {name: "Game Trailers", href:"/game-trailers"},
  //       {name: "Game Recordings & Guides", href:"/game-recordings-guides"},
  //       {name: "Meditation Videos", href:"/meditation-videos"},
  //       {name: "Real Estate Promos", href:"/real-estate-promos"},
  //       {name: "Book Trailers", href:"/book-trailers"},
  //       {name: "Video Advice", href:"/video-advice"},
  //       {name: "Product Photographers", href:"/product-photographers"},
  //       {name: "Portrait Photographers", href:"/portrait-photographers"},
  //       {name: "Lifestyle Photographers", href:"/lifestyle-photographers"},
  //       {name: "Local Photographers", href:"/local-photographers"},
  //     ]
  //   },
  //   {
  //     name: "Writing & Translation",
  //     categories:[
  //       {name: "Articles & Blog Posts",href:"/articles-blog-posts"},
  //       {name: "Content Strategy",href:"/content-strategy"},
  //       {name: "Website Content",href:"/website-content"},
  //       {name: "Scriptwriting",href:"/scriptwriting"},
  //       {name: "Creative Writing",href:"/creative-writing"},
  //       {name: "Podcast Writing",href:"/podcast-writing"},
  //       {name: "Speechwriting",href:"/speechwriting"},
  //       {name: "Research & Summaries",href:"/research-summaries"},
  //       {name: "Proofreading & Editing",href:"/proofreading-editing"},
  //       {name: "AI Content Editing",href:"/ai-content-editing"},
  //       {name: "Writing Advice",href:"/writing-advice"},
  //       {name: "Book & eBook Writing",href:"/book-ebook-writing"},
  //       {name: "Book Editing",href:"/book-editing"},
  //       {name: "Beta Reading",href:"/beta-reading"},
  //       {name: "Resume Writing",href:"/resume-writing"},
  //       {name: "Cover Letters",href:"/cover-letters"},
  //       {name: "Linkedin Profiles",href:"/linkedin-profiles"},
  //       {name: "Job Descriptions",href:"/job-descriptions"},
  //       {name: "eLearning Content Development",href:"/elearning-content-development"},
  //       {name: "Technical Writing",href:"/technical-writing"},
  //       {name: "Brand Voice & Tone",href:"/brand-voice-tone"},
  //       {name: "Business Names & Slogans",href:"/business-names-slogans"},
  //       {name: "Case Studies",href:"/case-studies"},
  //       {name: "White Papers",href:"/white-papers"},
  //       {name: "Product Descriptions",href:"/product-descriptions"},
  //       {name: "Ad Copy",href:"/ad-copy"},
  //       {name: "Sales Copy",href:"/sales-copy"},
  //       {name: "Email Copy",href:"/email-copy"},
  //       {name: "Social Media Copywriting",href:"/social-media-copywriting"},
  //       {name: "Press Releases",href:"/press-releases"},
  //       {name: "UX Writing",href:"/ux-writing"},
  //       {name: "Translation",href:"/translation"},
  //       {name: "Localization",href:"/localization"},
  //       {name: "Transcription",href:"/transcription"},
  //       {name: "Interpretation",href:"/interpretation"},
  //       {name: "Business, Finance & Law",href:"/business-finance-law"},
  //       {name: "Health & Medical",href:"/health-medical"},
  //       {name: "Internet & Technology",href:"/internet-technology"},
  //       {name: "News & Politics",href:"/news-politics"},
  //       {name: "Marketing",href:"/marketing"},
  //       {name: "Real Estate",href:"/real-estate"},
  //     ]
  //   },
  //   {
  //     name: "Music & Audio",
  //     categories:[
  //       {name: "Music Producers",href:"/music-producers"},
  //       {name: "Composers",href:"/composers"},
  //       {name: "Singers & Vocalists",href:"/singers-vocalists"},
  //       {name: "Session Musicians",href:"/session-musicians"},
  //       {name: "Songwriters",href:"/songwriters"},
  //       {name: "Jingles & Intros",href:"/jingles-intros"},
  //       {name: "Custom Songs",href:"/custom-songs"},
  //       {name: "Mixing & Mastering",href:"/mixing-mastering"},
  //       {name: "Audio Editing",href:"/audio-editing"},
  //       {name: "Vocal Tuning",href:"/vocal-tuning"},
  //       {name: "Voice Over",href:"/voice-over"},
  //       {name: "Female Voice Over",href:"female-voice-over"},
  //       {name: "Male Voice Over",href:"male-voice-over"},
  //       {name: "French Voice Over",href:"french-voice-over"},
  //       {name: "German Voice Over",href:"german-voice-over"},
  //       {name: "24hr Turnaround",href:"24hr-turnaround"},
  //       {name: "Podcast Production",href:"podcast-production"},
  //       {name: "Audiobook Production",href:"audiobook-production"},
  //       {name: "Audio Ads Production",href:"audio-ads-production"},
  //       {name: "Voice Synthesis & AI",href:"voice-synthesis-ai"},
  //       {name: "DJ Drops & Tags",href:"dj-drops-tags"},
  //       {name: "DJ Mixing",href:"dj-mixing"},
  //       {name: "Remixing",href:"remixing"},
  //       {name: "Sound Design",href:"sound-design"},
  //       {name: "Meditation Music",href:"meditation-music"},
  //       {name: "Audio Logo & Sonic Branding",href:"audio-logo-sonic-branding"},
  //       {name: "Custom Patches & Samples",href:"custom-patches-samples"},
  //       {name: "Audio Plugin Development",href:"audio-plugin-development"},
  //       {name: "Online Music Lessons",href:"online-music-lessons"},
  //       {name: "Music Transcription",href:"music-transcription"},
  //       {name: "Music & Audio Advice",href:"music-audio-advice"},
  //     ]
  //   },
  //   {
  //     name: "Business",
  //     categories:[
  //       {name: "Virtual Assistant",href:"virtual-assistant"},
  //       {name: "Project Management",href:"project-management"},
  //       {name: "HR Consulting",href:"hr-consulting"},
  //       {name: "Online Investigations",href:"online-investigations"},
  //       {name: "Supply Chain Management",href:"supply-chain-management"},
  //       {name: "E-Commerce Management",href:"e-commerce-management"},
  //       {name: "Product Research",href:"product-research"},
  //       {name: "Store Management",href:"store-management"},
  //       {name: "Amazon Experts",href:"amazon-experts"},
  //       {name: "Shopify Experts",href:"shopify-experts"},
  //       {name: "Etsy Experts",href:"etsy-experts"},
  //       {name: "Business Registration",href:"business-registration"},
  //       {name: "Business Plans",href:"business-plans"},
  //       {name: "Business Consulting",href:"business-consulting"},
  //       {name: "Market Research",href:"market-research"},
  //       {name: "Presentations",href:"presentations"},
  //       {name: "Sustainability Consulting",href:"sustainability-consulting"},
  //       {name: "Software Management",href:"software-management"},
  //       {name: "CRM Management",href:"crm-management"},
  //       {name: "ERP Management",href:"erp-management"},
  //       {name: "AI for Businesses",href:"ai-for-businesses"},
  //       {name: "AI Strategy",href:"ai-strategy"},
  //       {name: "AI Lessons",href:"ai-lessons"},
  //       {name: "Accounting & Bookkeeping",href:"accounting-bookkeeping"},
  //       {name: "Tax Consulting",href:"tax-consulting"},
  //       {name: "Financial Forecasting & Modeling",href:"financial-forecasting-modeling"},
  //       {name: "Financial Consulting",href:"financial-consulting"},
  //       {name: "Applications & Registrations",href:"applications-registrations"},
  //       {name: "Legal Documents & Contracts",href:"legal-documents-contracts"},
  //       {name: "Legal Review",href:"legal-review"},
  //       {name: "Legal Consulting",href:"legal-consulting"},
  //       {name: "Sales",href:"sales"},
  //       {name: "Lead Generation",href:"lead-generation"},
  //       {name: "Call Center & Calling",href:"call-center-calling"},
  //       {name: "Customer Care",href:"customer-care"},
  //       {name: "Professional Development",href:"professional-development"},
  //       {name: "Career Counseling",href:"career-counseling"},
  //       {name: "Life Coaching",href:"life-coaching"},
  //       {name: "Product Management",href:"product-management"},
  //       {name: "Fact Checking",href:"fact-checking"},
  //       {name: "Event Management",href:"event-management"},
  //     ]
  //   },
  //   {
  //     name: "Consulting",
  //     categories:[
  //       {name: "Legal Consulting",href:"legal-consulting"},
  //       {name: "Financial Consulting",href:"financial-consulting"},
  //       {name: "Business Consulting",href:"business-consulting"},
  //       {name: "HR Consulting",href:"hr-consulting"},
  //       {name: "AI Consulting",href:"ai-consulting"},
  //       {name: "Business Plans",href:"business-plans"},
  //       {name: "E-commerce Consulting",href:"e-commerce-consulting"},
  //       {name: "Marketing Strategy",href:"marketing-strategy"},
  //       {name: "Content Strategy",href:"content-strategy"},
  //       {name: "Social Media Strategy",href:"social-media-strategy"},
  //       {name: "Influencers Strategy",href:"influencers-strategy"},
  //       {name: "Video Marketing Consulting",href:"video-marketing-consulting"},
  //       {name: "SEM Strategy",href:"sem-strategy"},
  //       {name: "PR Strategy",href:"pr-strategy"},
  //       {name: "Data Analytics Consulting",href:"data-analytics-consulting"},
  //       {name: "Databases Consulting",href:"databases-consulting"},
  //       {name: "Data Visualization Consulting",href:"data-visualization-consulting"},
  //       {name: "Career Counseling",href:"career-counseling"},
  //       {name: "Life Coaching",href:"life-coaching"},
  //       {name: "Game Coaching",href:"game-coaching"},
  //       {name: "Styling & Beauty Advice",href:"styling-beauty-advice"},
  //       {name: "Travel Advice",href:"travel-advice"},
  //       {name: "Nutrition Coaching",href:"nutrition-coaching"},
  //       {name: "Mindfulness Coaching",href:"mindfulness-coaching"},
  //       {name: "Website Consulting",href:"website-consulting"},
  //       {name: "Mobile App Consulting",href:"mobile-app-consulting"},
  //       {name: "Game Development Consulting",href:"game-development-consulting"},
  //       {name: "Software Development Consulting",href:"software-development-consulting"},
  //       {name: "Cybersecurity Consulting",href:"cybersecurity-consulting"},
  //       {name: "Marketing Mentorship",href:"marketing-mentorship"},
  //       {name: "Design Mentorship",href:"design-mentorship"},
  //       {name: "Writing Mentorship",href:"writing-mentorship"},
  //       {name: "Video Mentorship",href:"video-mentorship"},
  //       {name: "Music Mentorship",href:"music-mentorship"},
  //     ]
  //   },
  //   {
  //     name: "Data",
  //     categories:[
  //       {name: "Machine Learning",href:"machine-learning"},
  //       {name: "Computer Vision",href:"computer-vision"},
  //       {name: "NLP",href:"nlp"},
  //       {name: "Deep Learning",href:"deep-learning"},
  //       {name: "Generative Models",href:"generative-models"},
  //       {name: "Time Series Analysis",href:"time-series-analysis"},
  //       {name: "Data Analytics",href:"data-analytics"},
  //       {name: "Data Visualization",href:"data-visualization"},
  //       {name: "Data Annotation",href:"data-annotation"},
  //       {name: "Dashboards",href:"dashboards"},
  //       {name: "Data Entry",href:"data-entry"},
  //       {name: "Data Typing",href:"data-typing"},
  //       {name: "Data Scraping",href:"data-scraping"},
  //       {name: "Data Formatting",href:"data-formatting"},
  //       {name: "Data Cleaning",href:"data-cleaning"},
  //       {name: "Data Enrichment",href:"data-enrichment"},
  //       {name: "Data Processing",href:"data-processing"},
  //       {name: "Data Engineering",href:"data-engineering"},
  //       {name: "Databases",href:"databases"},
  //       {name: "Data Governance & Protection",href:"data-governance-protection"},       
  //     ]
  //   },
  //   {
  //     name: "AI Services",
  //     categories:[
  //       {name: "AI Applications",href:"ai-applications"},
  //       {name: "AI Integrations",href:"ai-integrations"},
  //       {name: "AI Chatbot",href:"ai-chatbot"},
  //       {name: "AI Agents",href:"ai-agents"},
  //       {name: "AI Fine-Tuning",href:"ai-fine-tuning"},
  //       {name: "Custom GPT Apps",href:"custom-gpt-apps"},
  //       {name: "Data Science & ML",href:"data-science-ml"},
  //       {name: "Data Analytics",href:"data-analytics"},
  //       {name: "Data Visualization",href:"data-visualization"},
  //       {name: "Midjourney Artists",href:"midjourney-artists"},
  //       {name: "DALL-E Artists",href:"dall-e-artists"},
  //       {name: "Stable Diffusion Artists",href:"stable-diffusion-artists"},
  //       {name: "All AI Art Services",href:"all-ai-art-services"},
  //       {name: "AI Consulting",href:"ai-consulting"},
  //       {name: "AI Strategy",href:"ai-strategy"},
  //       {name: "AI Lessons",href:"ai-lessons"},
  //       {name: "AI Music Videos",href:"ai-music-videos"},
  //       {name: "AI Video Art",href:"ai-video-art"},
  //       {name: "AI Spokespersons Videos",href:"ai-spokespersons-videos"},
  //       {name: "Voice Synthesis & AI",href:"voice-synthesis-ai"},
  //       {name: "Text to Speech",href:"text-to-speech"},
  //       {name: "AI Content Editing",href:"ai-content-editing"},
  //       {name: "Custom Writing Prompts",href:"custom-writing-prompts"},       
  //     ]
  //   },
  // ]

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= 200; // Sola kaydır
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += 200; // Sağa kaydır
    }
  };

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === 's') {
          event.preventDefault()
          setSearchModal(true)
          
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, []);

    useEffect(() => {
      if (searchModal && inputRef.current) {
        inputRef.current.focus();
        setSearchValue("")
      }
    }, [searchModal]);

  return (
    <>
    {searchModal ?
    <div className="bg-black/50 w-screen h-screen fixed top-0 left-0 z-[9999999] flex justify-center items-center">
      <div className="w-2/6 flex-col flex bg-neutral-950 rounded-2xl border border-white/10 relative px-7 py-12 overflow-hidden">
        <IoCloseCircle onClick={() => setSearchModal(false)} className="absolute top-3 right-3 size-6 text-white/20 cursor-pointer hover:text-white transition-all"/>

        <div className="flex justify-center items-center w-full">
        <div className="flex items-center border border-neutral-800 max-md:hidden rounded-full cursor-text w-full">
          <IoSearch className="ml-2 text-neutral-400"/>
          <input
          type="text"
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="px-2 bg-transparent h-10 w-full caret-neutral-400 placeholder:text-neutral-400 outline-hidden transition-all duration-300 ease-in-out"
          placeholder={"Quick Search..."}
          autoComplete="off"
          />
          <span title="Shortcut" className="border w-fit whitespace-nowrap border-neutral-800 flex justify-center items-center text-xs text-neutral-400 p-2 mr-1 rounded-full cursor-pointer hover:bg-neutral-900/50 transition-all">Ctrl + S</span>
        </div>
        </div>

        {searchValue ? 
        <div className="flex-col items-center whitespace-pre-wrap w-full mt-4 h-[147px] overflow-x-hidden overflow-y-auto">
          {/* {Object.values(categories)?.map((cate:any,index:any) => {

            return (
              <Fragment key={index}>
                {Object.values(cate?.categories)?.filter((u:any) => u?.name?.[local]?.toLowerCase()?.includes(searchValue?.toLowerCase(), '\ga') )?.map((subCat:any,x:any) => {
                  console.log("subCat",subCat)
                  return (
                  <Fragment key={x}>
                    <Link href={`/search${subCat?.href?.[local]}`} className=" py-2 px-3 text-white/60 hover:text-white transition-all cursor-pointer w-full whitespace-nowrap shrink-0 block border-b border-white/5 hover:bg-black/50">{subCat?.name?.[local]}</Link>
                  </Fragment>
                  )
                })}
              </Fragment>
            )
          })} */}
        </div>
        :<div className="flex flex-wrap whitespace-pre-wrap w-full gap-2 mt-7">
          <div className="flex items-center w-full gap-x-2 text-white/30 cursor-default">
            <IoIosTrendingUp size={20}/>
            <h1>Popular Trending</h1>
          </div>
        {/* {Object.values(categories).map((item:any,index:any) => {
          const popular = item?.categories[0]?.name?.[local]
          const link = `/search${item?.categories[0]?.href?.[local]}`
          return (
            <Fragment key={index}>
            <Link href={link} key={index} className="border border-white/10 hover:border-white rounded-full px-3 py-1 cursor-pointer bg-neutral-900/80 hover:bg-neutral-900 text-white/60 hover:text-white transition-all text-xs">
              {popular}
            </Link>
            </Fragment>
          )
        })} */}
        </div>}

      </div>
    </div>
    : null
    }

    <nav className="justify-between items-center w-full flex border-b px-5 border-neutral-800 bg-black h-[75px] fixed top-0 left-0 z-[9999] max-md:px-3">
    <div>
      {/* <Image src={'/assets/logo.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-24 object-cover cursor-pointer max-md:block hidden"/> */}
      <div className=" items-center relative max-md:block hidden">
        <Link href='/' className="items-center relative max-md:block hidden">
          <Image src={'/assets/logo.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-28 object-cover cursor-pointer flex"/>
          <Image src={'/assets/shadow.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-7 bottom-0 right-0 animate-pulse absolute object-cover cursor-pointer flex"/>
          <Image src={'/assets/ball.png'} width={800} height={800} alt="lotterys.io Logo" className="w-4 bottom-4 right-1 animate-bounce absolute object-cover cursor-pointer flex"/>
        </Link>
      </div>
      {/* <div onClick={() => setSearchModal(!searchModal)} className="flex items-center border border-neutral-800 max-md:hidden rounded-full cursor-text">
        <IoSearch className="ml-2 text-neutral-400"/>
        <div
        className="px-2 py-2 text-neutral-400 justify-center items-center bg-transparent w-44 caret-neutral-400 placeholder:text-neutral-400 outline-hidden transition-all duration-300 ease-in-out"
        >{local === 'en' ? "Quick Search..." : "Hızlı Arama..."}</div>
        <span className="border border-neutral-800 flex justify-center items-center text-xs text-neutral-400 p-2 mr-1 rounded-full">Ctrl K</span>
      </div> */}
    </div>
    <div className="relative left-8 flex items-center gap-x-4">

      <div ref={listRef} className="flex items-center">
        {/* <NavigationMenu>
            <NavigationMenuList className="flex justify-between">
              {Object.values(categories).map((item:any, index:any) => {
                return (
                <Fragment key={index}>
                <NavigationMenuItem key={index} >
                  <HoverEffect>
                    <NavigationMenuTrigger>{item.name?.[local]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[1400px] lg:grid-cols-5">
                        {item.categories.map((category:any, categoryIndex:any) => (
                          <Fragment key={categoryIndex}>
                          <li key={categoryIndex}>
                            <Link
                              href={`/search${category.href?.[local]}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none max-2xl:text-xs">{category.name?.[local]}</div>
                            </Link>
                          </li>
                          </Fragment>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </HoverEffect>
                </NavigationMenuItem>
                </Fragment>
              )})}
            </NavigationMenuList>
        </NavigationMenu> */}
      </div>

    </div>
    <div className="flex items-center gap-x-4 relative">
      <Tippy content={"Search / Ctrl+S"}><button type="button" onClick={() => setSearchModal(!searchModal)}><IoSearch size={23} className="ml-2 text-white/30 hover:text-white transition-all block cursor-pointer"/></button></Tippy>
      {/* <Tippy content={local === 'en' ? "Notifications" : "Bildirimler"}><Link href={`/notifications`}><GoBell size={23} className={pathname.startsWith(`/${local}/notifications`) ? "text-teal-300 transition-all" : "text-white/30 hover:text-white transition-all"} />{pathname.startsWith(`/${local}/notifications`) && <span className="absolute w-8 h-[1px] bg-linear-to-r to-transparent via-teal-300 from-transparent -bottom-[10px] left-11"></span>}</Link></Tippy> */}

      {/* {user && <Tippy content={user?.user?.username}><div onClick={() => setProfileModal(!profileModal)}><Image src={user?.user?.image} alt={user?.user?.username} width={800} height={800} className={profileModal ? "rounded-full size-8 object-cover cursor-pointer transition-all border-2 border-white" : "rounded-full size-8 object-cover cursor-pointer opacity-30 hover:opacity-100 transition-all border-2 border-white/20"}/></div></Tippy>} */}
      {/* <ConnectButton/> */}
      <HiMenu size={30} className="cursor-pointer hidden max-md:block"/>
      <Tippy content={"Help & Resources"}><Link href={`/`}><TfiHelpAlt size={23} className={pathname.startsWith(`/help`) ? "text-teal-300 transition-all" : "text-white/30 hover:text-white transition-all"} />{pathname.startsWith(`/help`) && <span className="absolute w-8 h-[1px] bg-linear-to-r to-transparent via-teal-300 from-transparent -bottom-[10px] -right-[4px]"></span>}</Link></Tippy>
    </div>

  </nav>
  </>
  );
};

export default Navbar;
