import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const HIDDEN_KEYS = new Set(['__v'])

function formatValue(key, value) {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  if (/date/i.test(key) && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toLocaleString()
  }
  return String(value)
}

function getColumns(items) {
  const keys = new Set()
  items.forEach((item) => Object.keys(item).forEach((key) => keys.add(key)))
  return [...keys].filter((key) => !HIDDEN_KEYS.has(key))
}

export default function DataTable({ resource, title }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetchCollection(resource)
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [resource])

  const columns = getColumns(items)

  return (
    <div className="container py-4">
      <h1 className="mb-3">{title}</h1>

      {loading && <p>Loading {title.toLowerCase()}...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-muted">No {title.toLowerCase()} found.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column}>{formatValue(column, item[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
