"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { mockContacts } from "@/lib/mock-data"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Contact } from "@/lib/types"
import {
  Plus,
  Search,
  Filter,
  Users,
  DollarSign,
  Tag,
  Download,
  MoreHorizontal,
  Mail,
  ChevronDown,
} from "lucide-react"

export default function ContactsPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const filtered = mockContacts.filter(
    (c) =>
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const allSelected = filtered.length > 0 && filtered.every((c) => selected.includes(c.id))

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contacts</h2>
          <p className="text-sm text-gray-500 mt-0.5">{mockContacts.length.toLocaleString()} total contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5" /> Add contact</Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total contacts", value: mockContacts.length.toLocaleString(), icon: Users, color: "bg-violet-50 text-violet-600" },
          { label: "Total revenue", value: formatCurrency(mockContacts.reduce((s, c) => s + c.total_spent, 0)), icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
          { label: "Customers", value: mockContacts.filter((c) => c.orders_count > 0).length.toString(), icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Leads", value: mockContacts.filter((c) => c.orders_count === 0).length.toString(), icon: Tag, color: "bg-amber-50 text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl shrink-0", stat.color)}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
        <Button variant="outline" size="sm">
          All contacts <ChevronDown className="h-3.5 w-3.5 ml-1" />
        </Button>

        {selected.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500">{selected.length} selected</span>
            <Button size="sm" variant="outline"><Mail className="h-3.5 w-3.5" /> Email</Button>
            <Button size="sm" variant="outline"><Tag className="h-3.5 w-3.5" /> Tag</Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => {
                    if (allSelected) setSelected([])
                    else setSelected(filtered.map((c) => c.id))
                  }}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Contact</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Tags</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Source</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Orders</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Spent</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">Last active</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                selected={selected.includes(contact.id)}
                onToggle={() => toggle(contact.id)}
              />
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-8 w-8 text-gray-200 mb-3" />
            <p className="text-sm font-medium text-gray-700">No contacts found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ContactRow({
  contact,
  selected,
  onToggle,
}: {
  contact: Contact
  selected: boolean
  onToggle: () => void
}) {
  return (
    <tr className={cn("border-b border-gray-50 last:border-0 transition-colors", selected ? "bg-violet-50/30" : "hover:bg-gray-50/50")}>
      <td className="px-5 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-3.5 w-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
        />
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2.5">
          <Avatar name={contact.full_name} size="sm" />
          <div>
            <p className="text-sm font-medium text-gray-800">{contact.full_name}</p>
            <p className="text-xs text-gray-400">{contact.email}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3">
        <div className="flex flex-wrap gap-1">
          {contact.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
          {contact.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">+{contact.tags.length - 2}</Badge>
          )}
        </div>
      </td>
      <td className="px-5 py-3">
        <span className="text-sm text-gray-500 capitalize">{contact.lead_source ?? "—"}</span>
      </td>
      <td className="px-5 py-3 text-right">
        <span className="text-sm text-gray-700">{contact.orders_count}</span>
      </td>
      <td className="px-5 py-3 text-right">
        <span className="text-sm font-semibold text-gray-900">
          {contact.total_spent > 0 ? formatCurrency(contact.total_spent) : "—"}
        </span>
      </td>
      <td className="px-5 py-3 text-right">
        <span className="text-xs text-gray-400">
          {contact.last_active ? formatRelativeTime(contact.last_active) : "—"}
        </span>
      </td>
      <td className="px-5 py-3">
        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}
