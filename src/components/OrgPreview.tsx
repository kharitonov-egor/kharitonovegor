import { orgs, type OrgId } from '../data/orgs'
import { useLocalize } from '../i18n/lang'

export default function OrgPreview({ id }: { id: OrgId }) {
  const l = useLocalize()
  const org = orgs[id]

  return (
    <span className="group/org relative inline-block">
      <a href={org.url} target="_blank" rel="noopener noreferrer" className="link text-muted hover:text-fg">
        {org.name}
      </a>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-0 top-full z-30 mt-2 w-72 translate-y-1 rounded-xl border border-line bg-card p-3 opacity-0 shadow-2xl transition duration-150 group-focus-within/org:visible group-focus-within/org:translate-y-0 group-focus-within/org:opacity-100 group-hover/org:visible group-hover/org:translate-y-0 group-hover/org:opacity-100 print:hidden"
      >
        <span className="flex items-center gap-2.5">
          <img src={org.logo} alt="" className="h-7 w-7 rounded-md bg-white/5 object-cover" />
          <span className="text-sm font-medium text-fg">{org.name}</span>
        </span>
        <span className="mt-2 block text-xs leading-relaxed text-muted">{l(org.blurb)}</span>
        <span className="mt-2 block font-mono text-[11px] text-muted/80">{org.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
      </span>
    </span>
  )
}
