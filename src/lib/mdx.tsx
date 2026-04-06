import fs from "fs";
import path from "path";
import { type ReactNode } from "react";

const contentDir = path.join(process.cwd(), "src/content/projects");

export async function getProjectContent(slug: string): Promise<ReactNode> {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="text-muted text-[14px] italic py-8">
        <p>
          This case study is being written. Check back soon for the full story.
        </p>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const content = raw.replace(/^---[\s\S]*?---\n*/, "");
  const blocks = content.split(/\n\n+/);

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("## ")) {
          return <h2 key={i}>{trimmed.slice(3)}</h2>;
        }
        if (trimmed.startsWith("### ")) {
          return <h3 key={i}>{trimmed.slice(4)}</h3>;
        }

        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={i}>
              <p>{trimmed.slice(2)}</p>
            </blockquote>
          );
        }

        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }

        if (trimmed.startsWith("![")) {
          const altMatch = trimmed.match(/!\[(.*?)\]/);
          const alt = altMatch?.[1] || "Image";
          return (
            <div key={i} className="my-10">
              <div className="pinned block w-fit">
                <div className="w-full max-w-[520px] h-[260px] bg-surface flex items-center justify-center text-muted text-[10px] font-mono rounded-sm">
                  {alt}
                </div>
              </div>
            </div>
          );
        }

        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{
              __html: trimmed
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          />
        );
      })}
    </>
  );
}
