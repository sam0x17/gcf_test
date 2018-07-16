require "gcf"

class GcfTest < GCF::CloudFunction
  def run
    console.log "welcome to the test"
    sleep 3
    console.warn "this is a warning"
    console.error "this is an error"
    console.log "hey\nthis\nhas\nnewlines"
    send_file "./src/gcf_test.cr"
  end
end