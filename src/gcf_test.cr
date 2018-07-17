require "gcf"

class GcfTest < GCF::CloudFunction
  def run
    console.log "before error"
    raise "this is america"
  end
end