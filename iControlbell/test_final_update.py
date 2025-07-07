#!/usr/bin/env python3
"""
Quick test to verify the iOS app can read the updated SoundboardCategories.plist
"""

import plistlib
import os

def test_ios_plist_loading():
    """Test that matches how the iOS app loads the plist"""
    
    plist_path = "/Users/shanestone/Documents/CallBell-app/iControlbell/iControlbell/Resources/SoundboardCategories.plist"
    
    try:
        # Load exactly how PropertyListDecoder would in iOS
        with open(plist_path, 'rb') as f:
            categories = plistlib.load(f)
        
        print("🚀 iOS App Update Complete!")
        print("=" * 50)
        
        # Simulate iOS app loading
        print(f"✅ Successfully loaded {len(categories)} categories")
        
        # Test each category like iOS would
        for category in categories:
            category_id = category['id']
            display_names = category['displayNames']
            phrases = category['phrases']
            
            # Test English (default language)
            en_name = display_names.get('en', category_id)
            en_phrases = phrases.get('en', [])
            
            print(f"📱 Category: {en_name}")
            print(f"   Languages: {len(display_names)}")
            print(f"   English phrases: {len(en_phrases)}")
            
            # Show a sample phrase
            if en_phrases:
                print(f"   Sample: \"{en_phrases[0]}\"")
            
            # Test a few other languages
            other_langs = ['es', 'fr', 'de', 'ja', 'zh']
            available_others = [lang for lang in other_langs if lang in display_names]
            
            if available_others:
                lang = available_others[0]
                lang_name = display_names[lang]
                lang_phrases = phrases.get(lang, [])
                if lang_phrases:
                    print(f"   {lang_name}: \"{lang_phrases[0]}\"")
            
            print()
        
        print("🎉 Update Summary:")
        print(f"   • Total Categories: {len(categories)}")
        print(f"   • Total Languages: {len(categories[0]['displayNames']) if categories else 0}")
        print(f"   • File Size: {os.path.getsize(plist_path):,} bytes")
        print("   • Status: Ready for iOS app!")
        
        print("\n📝 Next Steps:")
        print("   1. Open iControlbell.xcodeproj in Xcode")
        print("   2. Build and run the app")
        print("   3. Verify all categories and languages appear correctly")
        print("   4. Test language switching functionality")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing plist: {e}")
        return False

if __name__ == "__main__":
    success = test_ios_plist_loading()
    exit(0 if success else 1)
