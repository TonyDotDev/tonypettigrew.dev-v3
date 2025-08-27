import { Typography } from "@/app/components/typography";

export const Section = ({
  children,
  title,
  id,
}: {
  children: React.ReactNode;
  title: string;
  id?: string;
}) => {
  return (
    <section id={id} className="flex flex-col gap-4">
      <Typography variant="h1" as="h2">
        {title}
      </Typography>
      {children}
    </section>
  );
};
