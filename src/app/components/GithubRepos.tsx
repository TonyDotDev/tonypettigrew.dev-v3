import { GoStar, GoRepoForked } from "react-icons/go";
import Link from "next/link";
import { type GitHubRepo } from "@/app/types";
import { Typography } from "@/app/components/typography";

export const GitHubRepos = ({ repos }: { repos: GitHubRepo[] }) => {
  if (!repos || repos.length === 0) {
    return <div>No repos found</div>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-8">
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={repo.html_url}
              className="no-underline"
            >
              <article className="relative flex flex-col gap-2 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-6 before:absolute before:top-0 before:left-0 before:h-3 before:w-3 before:rounded-tl-lg before:border-t-2 before:border-l-2 before:border-blue-500 after:absolute after:right-0 after:bottom-0 after:h-3 after:w-3 after:rounded-br-lg after:border-r-2 after:border-b-2 after:border-purple-500">
                <div>
                  <Typography variant="h3">{repo.name}</Typography>
                  <Typography variant="p" color="quaternary">
                    {repo.description}
                  </Typography>
                </div>

                <div className="flex items-center gap-4">
                  <Typography variant="p" className="flex items-center gap-1">
                    <GoStar aria-hidden="true" /> {repo.stargazers_count}
                  </Typography>
                  <Typography variant="p" className="flex items-center gap-1">
                    <GoRepoForked aria-hidden="true" /> {repo.forks_count}
                  </Typography>
                  <div className="flex items-center gap-1">
                    <div className="bg-primary h-2.5 w-2.5 rounded-full" />
                    <Typography variant="p">{repo.language}</Typography>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
