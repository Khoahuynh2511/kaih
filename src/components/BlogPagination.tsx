import React, { useState, useMemo } from 'react'

interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
}

interface BlogPaginationProps {
  posts: BlogPost[]
  itemsPerPage?: number
}

const BlogPagination: React.FC<BlogPaginationProps> = ({ 
  posts, 
  itemsPerPage = 4 
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const allTags = useMemo(() => {
    const tags = posts.flatMap(p => p.tags || [])
    return ['All', ...Array.from(new Set(tags))]
  }, [posts])

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
  }, [posts])

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => {
      const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag))
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      
      return matchesTag && matchesSearch
    })
  }, [sortedPosts, selectedTag, searchTerm])

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedTag, searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById('blog-container')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const postsByYear = useMemo(() => {
    const grouped: Record<string, typeof currentPosts> = {}
    currentPosts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString()
      if (!grouped[year]) grouped[year] = []
      grouped[year].push(post)
    })
    return grouped
  }, [currentPosts])

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    
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
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        
        <div className="md:w-48">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Show {filteredPosts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
        {searchTerm && ` for "${searchTerm}"`}
        {selectedTag !== 'All' && ` with tag "${selectedTag}"`}
      </div>

      <div className="flex flex-col gap-y-8" id="blog-container">
        {currentPosts.length > 0 ? (
          years.map((year) => (
            <section key={year} className="flex flex-col gap-y-4">
              <div className="font-semibold">{year}</div>
              <ul className="not-prose flex flex-col gap-4">
                {postsByYear[year].map((post) => (
                  <li key={post.id}>
                    <a 
                      href={`/blog/${post.id}`}
                      className="block not-prose rounded-xl border p-4 transition-colors duration-300 ease-in-out hover:bg-secondary/50"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row">
                        {post.image && (
                          <div className="max-w-[275px] sm:flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="object-cover w-full"
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h3 className="mb-1 text-lg font-semibold">
                            {post.title}
                          </h3>
                          <p className="mb-2 text-sm text-muted-foreground">
                            {post.description}
                          </p>
                          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                            <span>{formatDate(post.date)}</span>
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {renderPagination()}
    </div>
  )
}

export default BlogPagination
