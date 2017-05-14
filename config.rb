require 'slim'
require 'json'

###
# Page options, layouts, aliases and proxies
###

set :css_dir, 'assets/css'
set :js_dir, 'assets/js'
set :images_dir, 'assets/img'

# Per-page layout changes:
#
# With no layout
page '/*.yaml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Set slim-lang output style
Slim::Engine.set_default_options :pretty => true

# With alternative layout
# page '/path/to/file.html', layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy '/this-page-has-no-template.html', '/template-file.html', locals: {
#  which_fake_page: 'Rendering a fake page with a local variable' }

activate :directory_indexes
set :debug_assets, true

# Sounds Layout
page "/sounds/*", :layout => "sounds_layout"

# Contact Layout
page "/contact/*", :layout => "contact_layout"

###
# Helpers
###

activate :blog do |blog|
  # set options on blog
  blog.prefix = "blog"
  blog.layout = "blog_layout"
  blog.permalink = "{year}/{title}.html"
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  set :relative_links, true
  activate :relative_assets
  set :strip_index_file, true

  ignore '*.php'
end

string = File.read('data/soundlist.json')
json = JSON.parse(string)