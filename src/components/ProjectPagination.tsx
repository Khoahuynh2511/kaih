import React, { useState, useMemo } from 'react'

interface Project {
  title: string
  date: string
  description: string
  technologies: string[]
  projectUrl: string
  achievements: string[]
  imageUrl: string
  category: string
}

interface ProjectPaginationProps {
  projects: Project[]
  itemsPerPage?: number
}

const ProjectPagination: React.FC<ProjectPaginationProps> = ({ 
  projects, 
  itemsPerPage = 5 
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Lấy danh sách categories duy nhất
  const categories = useMemo(() => {
    const cats = projects.map(p => p.category)
    return ['All', ...Array.from(new Set(cats))]
  }, [projects])

  // Sắp xếp projects theo ngày mới nhất
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
  }, [projects])

  // Lọc projects theo category và search term
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
  }, [sortedProjects, selectedCategory, searchTerm])

  // Tính toán pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Reset về trang 1 khi filter thay đổi
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of projects section
    document.getElementById('projects-container')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
      >
        Previous
      </button>
    )

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 mx-1 text-sm border rounded-md ${
              currentPage === i 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            {i}
          </button>
        )
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push(
          <span key={`ellipsis-${i}`} className="px-3 py-2 mx-1 text-sm">
            ...
          </span>
        )
      }
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
      >
        Next
      </button>
    )

    return (
      <div className="flex justify-center items-center mt-8">
        {pages}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {/* Category Filter */}
        <div className="md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        Show {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
        {searchTerm && ` for "${searchTerm}"`}
        {selectedCategory !== 'All' && ` in category "${selectedCategory}"`}
      </div>

      {/* Projects List */}
      <div className="space-y-8" id="projects-container">
        {currentProjects.length > 0 ? (
          currentProjects.map((project, index) => (
            <div key={`${project.title}-${index}`} className="project-item">
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative aspect-video w-full">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-sm text-muted-foreground">{project.date}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                      {project.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                    
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Project
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  )
}

export default ProjectPagination 