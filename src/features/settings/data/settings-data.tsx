import { ChartColumnBig, ChartNoAxesGantt, CreditCard, KeyRound, Mail, MessageCircleCode, PhoneOutgoing, ShieldCheck, User } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram  } from "react-icons/fa6";

export const settingsData = [
  {
    section: "Workspace",
    items: [
      {
        title: "General",
        description: "Set your workspace name, time zone, languages, and more.",
        icon: <ChartNoAxesGantt />,
        url: "roles",
      },
      {
        title: "Teammates",
        description: "Manage or invite teammates and see all activity logs.",
        icon: <User />,
        url: "users",
      },
      {
        title: "Roles and Permission",
        description:"Create roles with specific permissions, assgin users to them",
        icon: <KeyRound />,
        url: "roles",
      },
      {
        title: "Security",
        description:"Configure all security settings for your workspace and data.",
        icon: <ShieldCheck />,
        url: "roles",
      },
    ],
  },
  {
    section: "Subscription",
    items: [
      {
        title: "Billing",
        description: "Manage your subscription and payment details.",
        icon: <CreditCard />,
        url: "roles",
      },
      {
        title: "Usage",
        description: "View your billed usage and set usage alerts and limits.",
        icon: <ChartColumnBig />,
        url: "roles",
      },
    ],
  },
  {
    section: "Channels",
    items: [
      {
        title: "Messenger",
        description: "Install and customize your messenger on web and mobile.",
        icon: <MessageCircleCode />,
        url: "channels/messenger",
      },
      {
        title: "Email",
        description: "Manage forwarding, domains, and customization.",
        icon: <Mail />,
        url: "roles",
      },
      {
        title: "Phone",
        description: "Set up and manage phone and messenger calls.",
        icon: <PhoneOutgoing />,
        url: "roles",
      },
      {
        title: "WhatsApp",
        description: "Install and configure WhatsApp messages from your inbox.",
        icon: <FaWhatsapp size={26}/> ,
        url: "roles",
      },
      {
        title: "Facebook Messenger",
        description: "Manage facebook messenger conversation from the chat.",
        icon: <FaFacebookF  size={26}/>,
        url: "roles",
      },
      {
        title: "Instagram",
        description: "Manage instagram direct message conversation from the chat.",
        icon: <FaInstagram  size={26}/>,
        url: "roles",
      },
    ],
  },
];





