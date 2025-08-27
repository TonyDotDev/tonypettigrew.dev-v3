import { IoIosGitBranch } from "react-icons/io";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { VscError, VscWarning, VscGitCommit } from "react-icons/vsc";
import Link from "next/link";

const FooterText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`text-foreground-primary text-sm sm:text-xs ${className}`}>
    {children}
  </span>
);

const FooterLink = ({
  children,
  newTab,
  href,
  ariaLabel,
}: {
  children: React.ReactNode;
  newTab: boolean;
  href: string;
  ariaLabel: string;
}) => (
  <Link
    href={href}
    className="text-foreground-primary text-xs"
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
    aria-label={ariaLabel}
  >
    {children}
  </Link>
);

const FooterIcon = ({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label?: string;
  className?: string;
}) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <span
      className="text-foreground-primary text-sm sm:text-xs"
      aria-hidden="true"
    >
      {icon}
    </span>
    {label && <FooterText>{label}</FooterText>}
  </div>
);

export const Footer = () => {
  return (
    <footer className="bg-primary text-foreground-primary pl-sidebar fixed bottom-0 flex w-full items-center justify-between py-1 pr-4">
      <div aria-hidden="true" className="hidden items-center gap-4 md:flex">
        <FooterIcon icon={<IoIosGitBranch />} label="main" />
        <div className="flex items-center gap-1">
          <FooterIcon icon={<VscError />} label="0" />
          <FooterIcon icon={<VscWarning />} label="0" />
        </div>
      </div>
      <div aria-hidden="true" className="flex items-center gap-4">
        <FooterIcon icon={<VscGitCommit />} label="Tony Pettigrew" />
        <FooterText className="hidden sm:block">Ln 1, Col 1</FooterText>
        <FooterText className="hidden sm:block">Spaces: 2</FooterText>
        <FooterText className="hidden sm:block">UTF-8</FooterText>
        <FooterText className="hidden sm:block">LF</FooterText>
        <FooterText>© {new Date().getFullYear()}</FooterText>
      </div>
      <div
        className="flex items-center gap-4"
        role="group"
        aria-label="Social media links"
      >
        <FooterLink
          newTab={false}
          href="mailto:get@tonypettigrew.dev"
          ariaLabel="Send email to Tony Pettigrew"
        >
          <FooterIcon icon={<FaEnvelope />} />
        </FooterLink>
        <FooterLink
          newTab={true}
          href="https://github.com/TonyDotDev"
          ariaLabel="Visit Tony Pettigrew's GitHub profile (opens in new tab)"
        >
          <FooterIcon icon={<FaGithub />} />
        </FooterLink>
        <FooterLink
          newTab={true}
          href="https://www.linkedin.com/in/tpettigrew4"
          ariaLabel="Visit Tony Pettigrew's LinkedIn profile (opens in new tab)"
        >
          <FooterIcon icon={<FaLinkedin />} />
        </FooterLink>
      </div>
    </footer>
  );
};
