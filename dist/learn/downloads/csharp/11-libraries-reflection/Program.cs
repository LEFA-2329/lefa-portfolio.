// Follow the numbered teaching parts in order. The full file combines every part.
using SharedRules;
using System.Reflection;
using System.Reflection.Emit;

Console.WriteLine($"Pass: {MarkRules.IsPass(70)}");
Type type = typeof(MarkRules);
Console.WriteLine($"Type: {type.Name}");
var method = type.GetMethod(nameof(MarkRules.IsPass))!;
Console.WriteLine($"Late binding: {method.Invoke(null, [40])}");
Console.WriteLine(type.GetCustomAttribute<StudyTopicAttribute>()!.Title);
dynamic student = new System.Dynamic.ExpandoObject();
student.Name = "Lefa";
Console.WriteLine(student.Name);
// Reflection.Emit builds a method at runtime; it is not a C# source-code compiler.
var asm = AssemblyBuilder.DefineDynamicAssembly(new AssemblyName("GeneratedStudyRules"), AssemblyBuilderAccess.Run);
var module = asm.DefineDynamicModule("Main");
var tb = module.DefineType("GeneratedRules", TypeAttributes.Public);
var mb = tb.DefineMethod("Seven", MethodAttributes.Public | MethodAttributes.Static, typeof(int), Type.EmptyTypes);
var il = mb.GetILGenerator();
il.Emit(OpCodes.Ldc_I4_7);
il.Emit(OpCodes.Ret);
var generated = tb.CreateType()!;
Console.WriteLine($"Emitted result: {generated.GetMethod("Seven")!.Invoke(null, null)}");
