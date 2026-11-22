// System diagram for a project case study, drawn with the site's own tokens so it
// follows the light/dark theme. Three tiers top to bottom: the client, the backend
// (a left-to-right pipeline plus the stages it moves through) and outside services.
// The shape of `architecture` is documented on the DocAdvisor entry in data/projects.js.

const tierLabel = 'font-mono text-[11px] text-faint';

function Node({ node }) {
  const dark = node.emphasis;
  return (
    <div className={`flex h-full flex-col gap-2 rounded-2xl border p-4 ${dark ? 'border-invert bg-invert text-invert-fg' : 'border-line bg-bg text-fg'}`}>
      <i className={`${node.icon} text-xl leading-none`} aria-hidden="true"></i>
      <p className="font-mono text-[13px] font-bold leading-snug">{node.title}</p>
      <p className={`text-xs leading-relaxed ${dark ? 'opacity-75' : 'text-muted'}`}>{node.detail}</p>
      {node.usedBy && <p className={`mt-auto pt-1 font-mono text-[11px] ${dark ? 'opacity-60' : 'text-faint'}`}>used in: {node.usedBy}</p>}
    </div>
  );
}

// "a · b · c" with each item kept whole and the dot left at the end of the line when it wraps.
function DotList({ text }) {
  const items = text.split(' · ');
  return items.map((item, index) => (
    <span key={item}>
      <span className="whitespace-nowrap">
        {item}
        {index < items.length - 1 && ' ·'}
      </span>
      {index < items.length - 1 && ' '}
    </span>
  ));
}

// Vertical link between tiers: what goes down on the left, what comes back on the right.
function Link({ down, up }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
      <p className="text-right font-mono text-[11px] leading-relaxed text-muted">
        <span className="sr-only">Request: </span>{down}
      </p>
      <div className="flex gap-1.5 text-line-strong" aria-hidden="true">
        <span className="flex flex-col items-center">
          <span className="h-7 w-px bg-line-strong"></span>
          <i className="ph-bold ph-caret-down -mt-1.5 text-xs"></i>
        </span>
        {up && (
          <span className="flex flex-col items-center">
            <i className="ph-bold ph-caret-up -mb-1.5 text-xs"></i>
            <span className="h-7 w-px bg-line-strong"></span>
          </span>
        )}
      </div>
      <p className="font-mono text-[11px] leading-relaxed text-muted">
        {up && <span className="sr-only">Response: </span>}
        {up && <DotList text={up} />}
      </p>
    </div>
  );
}

// Arrow between pipeline steps: down when stacked, right when in a row.
function StepArrow() {
  return (
    <span className="flex items-center justify-center text-faint" aria-hidden="true">
      <i className="ph-bold ph-arrow-down lg:hidden"></i>
      <i className="ph-bold ph-arrow-right hidden lg:inline"></i>
    </span>
  );
}

function Stages({ label, stages, note }) {
  return (
    <div className="mt-4 rounded-2xl border border-line p-4">
      <p className={tierLabel}>{label}</p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {stages.map((stage, index) => (
          <li key={stage} className="flex items-center gap-1.5">
            <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-fg">{stage}</span>
            {index < stages.length - 1 && <i className="ph-bold ph-arrow-right text-[10px] text-faint" aria-hidden="true"></i>}
          </li>
        ))}
      </ol>
      {note && <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>}
    </div>
  );
}

export default function ArchitectureDiagram({ architecture: a }) {
  return (
    <figure>
      {a.note && <figcaption className="mb-5 font-mono text-xs text-faint">{a.note}</figcaption>}

      {/* 1. Client */}
      <p className={`${tierLabel} mb-2`}>01 · Client</p>
      <Node node={a.client} />

      <Link down={a.request} up={a.response} />

      {/* 2. Backend */}
      <div className="rounded-3xl border border-dashed border-line-strong p-3 sm:p-4">
        <p className={`${tierLabel} mb-3 px-1`}>02 · {a.backend.title}</p>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {a.backend.pipeline.map((node, index) => (
            <div key={node.title} className="contents">
              {index > 0 && <StepArrow />}
              <div className="lg:min-w-0 lg:flex-1">
                <Node node={node} />
              </div>
            </div>
          ))}
        </div>
        <Stages label={a.backend.stagesLabel} stages={a.backend.stages} note={a.backend.stagesNote} />
      </div>

      <Link down={a.servicesLink} />

      {/* 3. Outside services */}
      <p className={`${tierLabel} mb-2`}>03 · External services</p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {a.services.map((node) => (
          <li key={node.title}>
            <Node node={node} />
          </li>
        ))}
      </ul>
    </figure>
  );
}
