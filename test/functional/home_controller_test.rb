require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get dirs" do
    get :dirs
    assert_response :success
  end

  test "should get images" do
    get :images
    assert_response :success
  end

end
