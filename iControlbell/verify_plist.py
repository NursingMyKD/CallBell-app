#!/usr/bin/env python3
"""
Verify the SoundboardCategories.plist file is properly formatted and contains expected data.
"""

import plistlib
import os

def verify_plist():
    plist_path = "/Users/shanestone/Documents/CallBell-app/iControlBell/iControlbell/Resources/SoundboardCategories.plist"
    
    if not os.path.exists(plist_path):
        print("❌ SoundboardCategories.plist not found")
        return False
    
    try:
        with open(plist_path, 'rb') as f:
            data = plistlib.load(f)
        
        print("✅ Plist file loaded successfully")
        
        # Check if it's an array
        if not isinstance(data, list):
            print("❌ Plist root should be an array")
            return False
        
        print(f"✅ Found {len(data)} categories")
        
        # Expected categories
        expected_categories = ['greetings', 'needs', 'comfort', 'feelings', 'responses']
        
        # Check each category
        for category in data:
            if not isinstance(category, dict):
                print("❌ Category should be a dictionary")
                return False
            
            if 'id' not in category:
                print("❌ Category missing 'id' key")
                return False
            
            if 'displayNames' not in category:
                print("❌ Category missing 'displayNames' key")
                return False
            
            if 'phrases' not in category:
                print("❌ Category missing 'phrases' key")
                return False
            
            category_id = category['id']
            display_names = category['displayNames']
            phrases = category['phrases']
            
            print(f"✅ Category '{category_id}' has {len(display_names)} language display names")
            print(f"✅ Category '{category_id}' has {len(phrases)} language phrase sets")
            
            # Check if we have the expected 28 languages
            if len(display_names) >= 28 and len(phrases) >= 28:
                print(f"✅ Category '{category_id}' has full language support")
            else:
                print(f"⚠️  Category '{category_id}' has {len(display_names)} display names and {len(phrases)} phrase sets")
        
        # Check if all expected categories are present
        found_categories = [cat['id'] for cat in data]
        missing_categories = set(expected_categories) - set(found_categories)
        
        if missing_categories:
            print(f"❌ Missing categories: {missing_categories}")
            return False
        
        print("✅ All expected categories found")
        print("✅ SoundboardCategories.plist verification complete!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error reading plist: {e}")
        return False

if __name__ == "__main__":
    success = verify_plist()
    exit(0 if success else 1)
