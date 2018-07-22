require "gcf"

class GcfTest < GCF::CloudFunction
  def run(params : JSON::Any)
    console.log params
    send "color: #{params["color"]?}"
  end
end
