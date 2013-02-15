class HomeController < ApplicationController


  def initialize()
    @images_root_dir = "/home/guoshiwei/LargeData/Software/test/emule/pics"
    super
  end

  def index
  end

  def dirs
    top_dirs = [ 1, 2, 3]
    respond_to do |format|
      format.html  # dirs.html.erb
      format.json  { render :json => top_dirs }
    end
  end

  def images
    dir = "#{@images_root_dir}/#{params[:dir]}/"
    all_images = Dir.glob("#{dir}*.{jpg,png,jpeg}").collect{|d| File.basename(d)}
    respond_to do |format|
      format.html  # images.html.erb
      format.json  { render :json =>{'dir' => File.basename(dir),
          'images' => all_images }
      }
    end
  end

  def get_image
    query = params[:query]
    image_url = "#{@images_root_dir}/#{params[:image]}"

    response.headers['Cache-Control'] = "public, max-age=#{12.hours.to_i}"
    response.headers['Content-Type'] = 'image/jpeg'
    response.headers['Content-Disposition'] = 'inline'
    render :text => open(image_url, 'rb').read
  end
end
