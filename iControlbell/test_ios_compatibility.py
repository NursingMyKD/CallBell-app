#!/usr/bin/env python3
"""
Test script to verify iOS app compatibility with the new SoundboardCategories.plist
"""

import plistlib
import json
import os

def test_ios_compatibility():
    """Test that the plist structure matches what the iOS app expects"""
    
    plist_path = "/Users/shanestone/Documents/CallBell-app/iControlBell/iControlbell/Resources/SoundboardCategories.plist"
    
    try:
        with open(plist_path, 'rb') as f:
            data = plistlib.load(f)
        
        print("🧪 Testing iOS app compatibility...")
        
        # Test that data is an array (matches SoundboardCategory array)
        assert isinstance(data, list), "Root should be array"
        print("✅ Root is array type")
        
        # Test each category structure
        for category in data:
            # Test required keys
            assert 'id' in category, f"Missing 'id' in category"
            assert 'displayNames' in category, f"Missing 'displayNames' in category"
            assert 'phrases' in category, f"Missing 'phrases' in category"
            
            # Test data types
            assert isinstance(category['id'], str), f"id should be string"
            assert isinstance(category['displayNames'], dict), f"displayNames should be dict"
            assert isinstance(category['phrases'], dict), f"phrases should be dict"
            
            # Test language codes consistency
            display_langs = set(category['displayNames'].keys())
            phrase_langs = set(category['phrases'].keys())
            assert display_langs == phrase_langs, f"Language codes mismatch in {category['id']}"
            
            # Test English language support (required)
            assert 'en' in display_langs, f"English support missing in {category['id']}"
            
            # Test phrases are arrays
            for lang, phrases in category['phrases'].items():
                assert isinstance(phrases, list), f"Phrases should be array for {lang} in {category['id']}"
                assert all(isinstance(p, str) for p in phrases), f"All phrases should be strings in {category['id']}"
            
            print(f"✅ Category '{category['id']}' structure valid")
        
        print("🎉 All tests passed! iOS app should be compatible with the new plist.")
        
        # Generate summary
        print("\n📊 Summary:")
        print(f"   • Categories: {len(data)}")
        print(f"   • Languages: {len(data[0]['displayNames']) if data else 0}")
        
        category_names = [cat['id'] for cat in data]
        print(f"   • Categories: {', '.join(category_names)}")
        
        if data:
            langs = list(data[0]['displayNames'].keys())
            print(f"   • Languages: {', '.join(langs[:5])}{'...' if len(langs) > 5 else ''}")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_ios_compatibility()
    exit(0 if success else 1)
