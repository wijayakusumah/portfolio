'use client'

import { useState } from 'react'
import { Plus, X, TrendingUp, Users, Building2, Clock, DollarSign, Target, Award, BarChart3, Globe } from 'lucide-react'

interface ImpactField {
  id: string
  label: string
  value: string
  icon?: string
}

interface DynamicImpactFormProps {
  initialImpact?: Record<string, string>
  onChange: (impact: Record<string, string>) => void
}

const iconOptions = [
  { value: 'TrendingUp', icon: TrendingUp, label: 'Growth' },
  { value: 'Users', icon: Users, label: 'Users' },
  { value: 'Building2', icon: Building2, label: 'Companies' },
  { value: 'Clock', icon: Clock, label: 'Time' },
  { value: 'DollarSign', icon: DollarSign, label: 'Revenue' },
  { value: 'Target', icon: Target, label: 'Goals' },
  { value: 'Award', icon: Award, label: 'Achievement' },
  { value: 'BarChart3', icon: BarChart3, label: 'Analytics' },
  { value: 'Globe', icon: Globe, label: 'Global' },
]

const commonImpactFields = [
  { label: 'Users Reached', value: 'usersReached', icon: 'Users' },
  { label: 'Companies Served', value: 'companiesServed', icon: 'Building2' },
  { label: 'Revenue Generated', value: 'revenueGenerated', icon: 'DollarSign' },
  { label: 'Time Saved', value: 'timeSaved', icon: 'Clock' },
  { label: 'Efficiency Gain', value: 'efficiencyGain', icon: 'TrendingUp' },
  { label: 'Market Coverage', value: 'marketCoverage', icon: 'Globe' },
]

export default function DynamicImpactForm({ initialImpact = {}, onChange }: DynamicImpactFormProps) {
  const [fields, setFields] = useState<ImpactField[]>(() => {
    const initialFields = Object.entries(initialImpact).map(([key, value]) => ({
      id: key,
      label: key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase()),
      value,
      icon: getIconForField(key)
    }))
    return initialFields.length > 0 ? initialFields : []
  })

  const [showCommonFields, setShowCommonFields] = useState(false)
  const [newField, setNewField] = useState({ label: '', value: '', icon: 'TrendingUp' })

  function getIconForField(key: string): string {
    const lowerKey = key.toLowerCase()
    if (lowerKey.includes('user')) return 'Users'
    if (lowerKey.includes('company')) return 'Building2'
    if (lowerKey.includes('revenue') || lowerKey.includes('cash')) return 'DollarSign'
    if (lowerKey.includes('time') || lowerKey.includes('work')) return 'Clock'
    if (lowerKey.includes('scale') || lowerKey.includes('market')) return 'Globe'
    if (lowerKey.includes('efficiency') || lowerKey.includes('growth')) return 'TrendingUp'
    return 'TrendingUp'
  }

  const updateFields = (newFields: ImpactField[]) => {
    setFields(newFields)
    const impactObject = newFields.reduce((acc, field) => {
      const key = field.label.toLowerCase().replace(/\s+/g, '')
      acc[key] = field.value
      return acc
    }, {} as Record<string, string>)
    onChange(impactObject)
  }

  const addField = (label: string, value: string = '', icon: string = 'TrendingUp') => {
    const newField: ImpactField = {
      id: Date.now().toString(),
      label,
      value,
      icon
    }
    updateFields([...fields, newField])
  }

  const removeField = (id: string) => {
    updateFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: string, updates: Partial<ImpactField>) => {
    updateFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const addCommonField = (commonField: typeof commonImpactFields[0]) => {
    addField(commonField.label, '', commonField.icon)
    setShowCommonFields(false)
  }

  const addCustomField = () => {
    if (newField.label.trim()) {
      addField(newField.label.trim(), newField.value, newField.icon)
      setNewField({ label: '', value: '', icon: 'TrendingUp' })
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : TrendingUp
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Impact & Metrics</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowCommonFields(!showCommonFields)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Common
          </button>
          <button
            type="button"
            onClick={() => setShowCommonFields(false)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Custom
          </button>
        </div>
      </div>

      {/* Common Fields Dropdown */}
      {showCommonFields && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Common Impact Fields</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {commonImpactFields.map((field) => {
              const IconComponent = getIconComponent(field.icon)
              return (
                <button
                  key={field.value}
                  type="button"
                  onClick={() => addCommonField(field)}
                  className="flex items-center p-2 text-sm text-gray-700 hover:bg-white rounded-md border border-transparent hover:border-gray-300 transition-colors"
                >
                  <IconComponent className="h-4 w-4 mr-2 text-gray-500" />
                  {field.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Custom Field Input */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Impact Field</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Field label (e.g., Carbon Reduction)"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
            className="col-span-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <input
            type="text"
            placeholder="Value (e.g., 50% reduction)"
            value={newField.value}
            onChange={(e) => setNewField({ ...newField, value: e.target.value })}
            className="col-span-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="flex items-center space-x-2">
            <select
              value={newField.icon}
              onChange={(e) => setNewField({ ...newField, icon: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addCustomField}
              disabled={!newField.label.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Current Fields */}
      {fields.length > 0 ? (
        <div className="space-y-3">
          {fields.map((field) => {
            const IconComponent = getIconComponent(field.icon)
            return (
              <div key={field.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white">
                <div className="flex-shrink-0">
                  <IconComponent className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Field label"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Value/metric"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No impact metrics added yet. Add common fields or create custom ones to measure project impact.</p>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Add impact metrics that are relevant to this specific project. Different projects may have different success metrics.
      </p>
    </div>
  )
}