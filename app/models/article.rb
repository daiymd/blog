class Article < ApplicationRecord
  belongs_to :user
  has_many :comments

  with_options presence: true do
    validates :title
    validates :text
  end
  
  mount_uploader :image, ImageUploader
  acts_as_taggable_on :labels
  acts_as_taggable
  is_impressionable counter_cache: true
end
